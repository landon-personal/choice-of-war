import { useState, useEffect, useRef } from 'react';
import stories from '../data/stories';
import countries from '../data/countries';

function parseStoryText(text) {
  const parts = [];
  const lines = text.split('\n');
  let currentBlock = { type: 'narrative', lines: [] };
  for (const line of lines) {
    if (line.startsWith('Historical fact:')) {
      if (currentBlock.lines.length > 0) parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
      currentBlock = { type: 'fact', lines: [line.replace('Historical fact: ', '')] };
    } else if (line.startsWith('KEY LESSONS:')) {
      if (currentBlock.lines.length > 0) parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
      currentBlock = { type: 'lessons', lines: [] };
    } else if (currentBlock.type === 'fact' && line === '') {
      parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
      currentBlock = { type: 'narrative', lines: [] };
    } else {
      currentBlock.lines.push(line);
    }
  }
  if (currentBlock.lines.length > 0) parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
  return parts;
}

export default function MultiplayerStory({ levelId, multiplayer, onNavigate }) {
  const { isHost, players, gameState, updateGameState, sendVote } = multiplayer;
  const story = stories[levelId];
  const country = countries.available.find(c => c.id === levelId);

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const textRef = useRef(null);
  const intervalRef = useRef(null);
  const lastNodeRef = useRef(null);

  // Initialize game state (host only)
  useEffect(() => {
    if (isHost && !gameState) {
      updateGameState({
        phase: 'intro', // intro, playing, voting, result, ending
        currentNode: null,
        votes: {},
        voteResult: null,
        choicesMade: 0,
      });
    }
  }, [isHost]);

  // React to game state changes — type text when node changes
  useEffect(() => {
    if (!gameState) return;
    const nodeKey = gameState.phase === 'intro' ? '__intro__' : gameState.currentNode;
    if (nodeKey !== lastNodeRef.current) {
      lastNodeRef.current = nodeKey;
      if (gameState.phase === 'intro') {
        typeText(story.intro);
      } else if (gameState.currentNode && story.nodes[gameState.currentNode]) {
        typeText(story.nodes[gameState.currentNode].text);
      }
    }
  }, [gameState?.phase, gameState?.currentNode]);

  useEffect(() => {
    if (textRef.current && isTyping) textRef.current.scrollTop = textRef.current.scrollHeight;
  }, [displayedText]);

  // Check if all votes are in
  useEffect(() => {
    if (!gameState || gameState.phase !== 'voting') return;
    const voteCount = Object.keys(gameState.votes).length;
    if (voteCount >= players.length && isHost) {
      tallyVotes();
    }
  }, [gameState?.votes, players.length]);

  function typeText(text) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsTyping(true);
    setShowChoices(false);
    setDisplayedText('');
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsTyping(false);
        setShowChoices(true);
      }
    }, 12);
  }

  function skipTyping() {
    if (!isTyping) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsTyping(false);
    const fullText = gameState?.phase === 'intro' ? story.intro : story.nodes[gameState?.currentNode]?.text || '';
    setDisplayedText(fullText);
    setShowChoices(true);
  }

  // HOST: Start voting phase
  function startVoting() {
    if (!isHost) return;
    updateGameState({ ...gameState, phase: 'voting', votes: {}, voteResult: null });
  }

  // ANYONE: Cast a vote
  function castVote(choiceIndex) {
    const myPlayer = players.find(p => {
      // Find our player — host is always first, clients match by exclusion
      // We identify by index position for simplicity
      return true;
    });
    // Find my player ID
    const myId = getMyPlayerId();
    if (!myId || gameState.votes[myId] !== undefined) return; // already voted
    sendVote(myId, choiceIndex);
  }

  function getMyPlayerId() {
    // Host is always players[0], clients need to figure out their ID
    if (isHost) return players[0]?.id;
    // For clients, their peer ID won't match exactly — use the player list
    // The multiplayer hook assigns IDs based on peer IDs
    // We need to find which player we are
    // Since PeerJS assigns random IDs to clients, we stored them in the players list
    // The client's peer is the one that's NOT the host
    // Actually, the simplest approach: non-host players are added in order they joined
    // For now, we'll use a simple approach — check which player IDs haven't been claimed
    return players.find((p, i) => i > 0 && !isHost)?.id || players[players.length - 1]?.id;
  }

  // HOST: Tally votes and determine result
  function tallyVotes() {
    const node = story.nodes[gameState.currentNode];
    const tally = {};
    Object.values(gameState.votes).forEach(v => {
      tally[v] = (tally[v] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(tally));
    const winners = Object.keys(tally).filter(k => tally[k] === maxCount);
    const winningChoice = winners.length === 1
      ? parseInt(winners[0])
      : parseInt(winners[Math.floor(Math.random() * winners.length)]);

    updateGameState({
      ...gameState,
      phase: 'result',
      voteResult: {
        tally,
        winner: winningChoice,
        choiceText: node.choices[winningChoice].text,
        isTie: winners.length > 1,
      },
    });
  }

  // HOST: Accept mission (intro -> start)
  function acceptMission() {
    if (!isHost) return;
    updateGameState({
      ...gameState,
      phase: 'playing',
      currentNode: 'start',
      votes: {},
      voteResult: null,
    });
  }

  // HOST: Execute vote result — advance to next node
  function executeResult() {
    if (!isHost) return;
    const node = story.nodes[gameState.currentNode];
    const nextNode = node.choices[gameState.voteResult.winner].next;
    const nextNodeData = story.nodes[nextNode];
    updateGameState({
      ...gameState,
      phase: nextNodeData?.isEnding ? 'ending' : 'playing',
      currentNode: nextNode,
      votes: {},
      voteResult: null,
      choicesMade: gameState.choicesMade + 1,
    });
  }

  // HOST: Replay
  function replay() {
    if (!isHost) return;
    lastNodeRef.current = null;
    updateGameState({
      phase: 'intro',
      currentNode: null,
      votes: {},
      voteResult: null,
      choicesMade: 0,
    });
  }

  if (!gameState) {
    return (
      <div className="min-h-[100dvh] bg-black flex items-center justify-center">
        <div className="pixel-text text-red-700 text-xs blink">CONNECTING...</div>
      </div>
    );
  }

  const node = gameState.currentNode ? story.nodes[gameState.currentNode] : null;
  const isEnding = gameState.phase === 'ending' || node?.isEnding;
  const storyParts = gameState.phase !== 'intro' && displayedText ? parseStoryText(displayedText) : [];
  const myId = getMyPlayerId();
  const hasVoted = gameState.votes[myId] !== undefined;

  return (
    <div className="scanlines min-h-[100dvh] war-room-bg flex flex-col" onClick={skipTyping}>
      {/* Top bar */}
      <div className="relative z-10 border-b border-red-900/30 bg-black/80">
        <div className="flex items-center justify-between px-3 md:px-5 py-2 max-w-4xl mx-auto w-full">
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('levelselect'); }}
            className="pixel-text text-red-800 text-[8px] md:text-[10px] hover:text-red-400 cursor-pointer"
          >
            LEAVE
          </button>
          <div className="flex items-center gap-3 md:gap-4">
            {/* Online players */}
            <div className="flex gap-1">
              {players.map(p => (
                <div key={p.id} className="w-2 h-2 md:w-2.5 md:h-2.5 rotate-45" style={{ backgroundColor: p.color }} title={p.name} />
              ))}
            </div>
            <div className="pixel-text text-[7px] md:text-[9px] text-amber-600 border border-amber-800/50 px-1.5 py-0.5">
              {roomCode}
            </div>
            <div className="pixel-text text-red-500 text-[8px] md:text-[10px]">
              {country?.name}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-3 md:px-6 py-4 md:py-8 w-full">
        <div className="w-full max-w-3xl">

          {/* INTRO */}
          {gameState.phase === 'intro' && (
            <div className="fade-in-up">
              <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-900/50" />
                <span className="pixel-text text-[7px] md:text-[9px] text-red-700 border border-red-900/50 px-2 md:px-3 py-1 tracking-[2px]">
                  MULTIPLAYER BRIEFING
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-900/50" />
              </div>

              <div className="text-center mb-6 md:mb-10">
                <h1 className="pixel-text text-sm md:text-3xl text-red-500 glow-red mb-2 leading-relaxed">
                  {story.title}
                </h1>
                <span className="pixel-text text-[8px] md:text-[10px] text-red-800">{story.year}</span>
              </div>

              <div className="border border-red-900/30 bg-black/40 p-4 md:p-8 mb-4 md:mb-8">
                <div className="terminal-text text-base md:text-2xl text-amber-100/90 leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="text-amber-500 blink">█</span>}
                </div>
              </div>

              {showChoices && isHost && (
                <div className="fade-in" onClick={(e) => e.stopPropagation()}>
                  <button onClick={acceptMission} className="pixel-btn w-full bg-red-950/60 border-red-700 text-red-100 px-6 py-3 md:py-5 text-[8px] md:text-[10px] hover:bg-red-900/80">
                    ACCEPT MISSION
                  </button>
                </div>
              )}
              {showChoices && !isHost && (
                <div className="pixel-text text-[7px] md:text-[9px] text-gray-600 text-center">
                  WAITING FOR HOST...
                </div>
              )}
            </div>
          )}

          {/* PLAYING / VOTING / RESULT / ENDING */}
          {gameState.phase !== 'intro' && (
            <div className="fade-in flex flex-col">
              {gameState.currentNode === 'start' && (
                <div className="mb-3 md:mb-5">
                  <h2 className="pixel-text text-[9px] md:text-lg text-red-500 glow-red mb-1">{story.title}</h2>
                  <div className="h-px w-12 md:w-16 bg-red-800" />
                </div>
              )}

              {/* Story text */}
              <div ref={textRef} className="border border-red-900/20 bg-black/50 p-3 md:p-8 overflow-y-auto mb-4 md:mb-6" style={{ maxHeight: '40vh' }}>
                {showChoices && storyParts.length > 0 ? (
                  <div className="space-y-3 md:space-y-5">
                    {storyParts.map((part, i) => {
                      if (part.type === 'fact') return (
                        <div key={i} className="border-l-2 border-amber-700/60 bg-amber-950/20 px-3 py-2">
                          <div className="pixel-text text-[6px] md:text-[7px] text-amber-700 mb-1.5">HISTORICAL RECORD</div>
                          <div className="terminal-text text-sm md:text-lg text-amber-200/80 leading-relaxed">{part.text}</div>
                        </div>
                      );
                      if (part.type === 'lessons') return (
                        <div key={i} className="border border-green-900/40 bg-green-950/10 p-3">
                          <div className="pixel-text text-[6px] md:text-[7px] text-green-600 mb-2">KEY INTELLIGENCE</div>
                          <div className="terminal-text text-sm md:text-lg text-green-200/80 leading-relaxed">{part.text}</div>
                        </div>
                      );
                      return <div key={i} className="terminal-text text-base md:text-2xl text-gray-200 leading-relaxed whitespace-pre-line">{part.text}</div>;
                    })}
                  </div>
                ) : (
                  <div className="terminal-text text-base md:text-2xl text-gray-200 leading-relaxed whitespace-pre-line">
                    {displayedText}
                    {isTyping && <span className="text-red-500 blink">█</span>}
                  </div>
                )}
              </div>

              {isTyping && (
                <div className="pixel-text text-[6px] md:text-[7px] text-gray-700 text-center mb-3">[ TAP TO SKIP ]</div>
              )}

              {/* Choices area */}
              {showChoices && (
                <div className="fade-in-up" onClick={(e) => e.stopPropagation()}>

                  {/* PLAYING — host starts vote */}
                  {gameState.phase === 'playing' && !isEnding && (
                    <div>
                      <div className="pixel-text text-[7px] md:text-[8px] text-red-600 mb-3 flex items-center gap-2">
                        <span className="blink">!</span> DECISION REQUIRED
                      </div>
                      {node?.choices.map((choice, i) => (
                        <div key={i} className="border border-red-900/30 bg-red-950/10 p-3 mb-2 flex items-start gap-3">
                          <div className="pixel-text text-[10px] text-red-600 bg-red-950/60 w-7 h-7 flex items-center justify-center shrink-0 border border-red-800/50">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="terminal-text text-sm md:text-lg text-red-200/70 pt-0.5">{choice.text}</div>
                        </div>
                      ))}
                      {isHost ? (
                        <button onClick={startVoting} className="pixel-btn w-full bg-yellow-950/40 border-yellow-700 text-yellow-200 px-4 py-3 text-[8px] md:text-[10px] hover:bg-yellow-900/50 mt-2">
                          START VOTE
                        </button>
                      ) : (
                        <div className="pixel-text text-[7px] text-gray-600 text-center mt-2">WAITING FOR HOST TO START VOTE...</div>
                      )}
                    </div>
                  )}

                  {/* VOTING — everyone votes */}
                  {gameState.phase === 'voting' && (
                    <div>
                      <div className="pixel-text text-[7px] md:text-[8px] text-yellow-500 mb-3 flex items-center gap-2">
                        VOTE NOW — {Object.keys(gameState.votes).length}/{players.length} VOTED
                      </div>
                      {/* Vote progress */}
                      <div className="flex gap-1.5 mb-3">
                        {players.map(p => (
                          <div key={p.id} className="flex items-center gap-1">
                            <div className="w-2.5 h-2.5 rotate-45" style={{ backgroundColor: p.color, opacity: gameState.votes[p.id] !== undefined ? 1 : 0.3 }} />
                            {gameState.votes[p.id] !== undefined && <span className="pixel-text text-[6px]" style={{ color: p.color }}>✓</span>}
                          </div>
                        ))}
                      </div>
                      {hasVoted ? (
                        <div className="pixel-text text-[8px] md:text-[10px] text-green-500 text-center py-4 border border-green-900/30 bg-green-950/10">
                          VOTE CAST — WAITING FOR OTHERS...
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {node?.choices.map((choice, i) => (
                            <button
                              key={i}
                              onClick={() => castVote(i)}
                              className="group w-full text-left border-2 border-red-900/40 bg-red-950/10 hover:bg-red-900/30 hover:border-red-500 active:bg-red-900/40 cursor-pointer"
                            >
                              <div className="flex items-start gap-3 p-3 md:p-4">
                                <div className="pixel-text text-[10px] text-red-500 bg-red-950/60 w-7 h-7 flex items-center justify-center shrink-0 border border-red-800/50">
                                  {String.fromCharCode(65 + i)}
                                </div>
                                <div className="terminal-text text-sm md:text-lg text-red-200/80 leading-snug pt-0.5">{choice.text}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* RESULT — show vote breakdown */}
                  {gameState.phase === 'result' && gameState.voteResult && (
                    <div>
                      <div className="pixel-text text-[7px] md:text-[8px] text-green-500 mb-3">
                        {gameState.voteResult.isTie ? 'TIE — RANDOM PICK' : 'VOTE RESULTS'}
                      </div>
                      {node?.choices.map((choice, i) => {
                        const count = gameState.voteResult.tally[i] || 0;
                        const isWinner = i === gameState.voteResult.winner;
                        return (
                          <div key={i} className={`border p-3 mb-2 ${isWinner ? 'border-green-700/60 bg-green-950/20' : 'border-gray-800/40 opacity-40'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`pixel-text text-[8px] ${isWinner ? 'text-green-400' : 'text-gray-600'}`}>{isWinner && '► '}{choice.text}</span>
                              <span className={`pixel-text text-[9px] ${isWinner ? 'text-green-400' : 'text-gray-600'}`}>{count}</span>
                            </div>
                            <div className="flex gap-1">
                              {players.map(p => gameState.votes[p.id] === i ? (
                                <div key={p.id} className="w-2.5 h-2.5 rotate-45" style={{ backgroundColor: p.color }} title={p.name} />
                              ) : null)}
                            </div>
                          </div>
                        );
                      })}
                      {isHost ? (
                        <button onClick={executeResult} className="pixel-btn w-full bg-green-950/40 border-green-700 text-green-200 px-4 py-3 text-[8px] md:text-[10px] hover:bg-green-900/50 mt-2">
                          PROCEED
                        </button>
                      ) : (
                        <div className="pixel-text text-[7px] text-gray-600 text-center mt-2">HOST WILL PROCEED...</div>
                      )}
                    </div>
                  )}

                  {/* ENDING */}
                  {isEnding && (
                    <div className="flex flex-col gap-2">
                      {isHost ? (
                        <>
                          <button onClick={replay} className="pixel-btn w-full bg-red-950/40 border-red-800 text-red-200 px-4 py-3 text-[8px] md:text-[10px] hover:bg-red-900/60">
                            REPLAY
                          </button>
                          <button onClick={() => onNavigate('levelselect')} className="pixel-btn w-full bg-gray-950/40 border-gray-700 text-gray-400 px-4 py-3 text-[8px] md:text-[10px] hover:bg-gray-900/60">
                            NEW CONFLICT
                          </button>
                        </>
                      ) : (
                        <div className="pixel-text text-[8px] text-gray-500 text-center">WAITING FOR HOST...</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-red-900/20 bg-black/80 px-3 py-1.5">
        <div className="flex items-center justify-between max-w-4xl mx-auto pixel-text text-[5px] md:text-[7px] text-red-900/50">
          <span>{country?.name} — {story.year} — ONLINE</span>
          <span>LANDON KRUSE</span>
        </div>
      </div>
    </div>
  );
}
