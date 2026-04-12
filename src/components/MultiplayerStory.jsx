import { useState, useEffect, useRef } from 'react';
import stories from '../data/stories';
import countries from '../data/countries';

function parseStoryText(text) {
  const parts = [];
  const lines = text.split('\n');
  let currentBlock = { type: 'narrative', lines: [] };

  for (const line of lines) {
    if (line.startsWith('Historical fact:')) {
      if (currentBlock.lines.length > 0) {
        parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
      }
      currentBlock = { type: 'fact', lines: [line.replace('Historical fact: ', '')] };
    } else if (line.startsWith('KEY LESSONS:')) {
      if (currentBlock.lines.length > 0) {
        parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
      }
      currentBlock = { type: 'lessons', lines: [] };
    } else if (currentBlock.type === 'fact' && line === '') {
      parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
      currentBlock = { type: 'narrative', lines: [] };
    } else {
      currentBlock.lines.push(line);
    }
  }
  if (currentBlock.lines.length > 0) {
    parts.push({ ...currentBlock, text: currentBlock.lines.join('\n') });
  }
  return parts;
}

export default function MultiplayerStory({ levelId, players, onNavigate }) {
  const story = stories[levelId];
  const country = countries.available.find(c => c.id === levelId);
  const [currentNode, setCurrentNode] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [history, setHistory] = useState([]);
  const [choicesMade, setChoicesMade] = useState(0);
  const textRef = useRef(null);
  const intervalRef = useRef(null);

  const [votes, setVotes] = useState({});
  const [currentVoter, setCurrentVoter] = useState(0);
  const [votingPhase, setVotingPhase] = useState(false);
  const [voteResult, setVoteResult] = useState(null);

  useEffect(() => {
    if (showIntro) typeText(story.intro);
  }, [showIntro]);

  useEffect(() => {
    if (currentNode && story.nodes[currentNode]) {
      typeText(story.nodes[currentNode].text);
    }
  }, [currentNode]);

  useEffect(() => {
    if (textRef.current && isTyping) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [displayedText]);

  function typeText(text) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsTyping(true);
    setShowChoices(false);
    setVotingPhase(false);
    setVotes({});
    setCurrentVoter(0);
    setVoteResult(null);
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
    const fullText = showIntro ? story.intro : story.nodes[currentNode]?.text || '';
    setDisplayedText(fullText);
    setShowChoices(true);
  }

  function startVoting() {
    setVotingPhase(true);
    setVotes({});
    setCurrentVoter(0);
    setVoteResult(null);
  }

  function castVote(choiceIndex) {
    const newVotes = { ...votes, [players[currentVoter].id]: choiceIndex };
    setVotes(newVotes);
    if (currentVoter + 1 < players.length) {
      setCurrentVoter(currentVoter + 1);
    } else {
      tallyVotes(newVotes);
    }
  }

  function tallyVotes(allVotes) {
    const node = story.nodes[currentNode];
    const tally = {};
    Object.values(allVotes).forEach(v => {
      tally[v] = (tally[v] || 0) + 1;
    });
    let maxCount = Math.max(...Object.values(tally));
    let winners = Object.keys(tally).filter(k => tally[k] === maxCount);
    let winningChoice = winners.length === 1
      ? parseInt(winners[0])
      : parseInt(winners[Math.floor(Math.random() * winners.length)]);

    setVoteResult({
      tally,
      winner: winningChoice,
      choiceText: node.choices[winningChoice].text,
      isTie: winners.length > 1,
    });
  }

  function executeVoteResult() {
    const node = story.nodes[currentNode];
    const nextNode = node.choices[voteResult.winner].next;
    setHistory(prev => [...prev, currentNode]);
    setCurrentNode(nextNode);
    setChoicesMade(c => c + 1);
  }

  function handleIntroAdvance() {
    setHistory(prev => [...prev, 'intro']);
    setShowIntro(false);
    setCurrentNode('start');
  }

  function handleBack() {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      if (prev === 'intro') {
        setShowIntro(true);
        setCurrentNode(null);
      } else {
        setCurrentNode(prev);
      }
      setChoicesMade(c => Math.max(0, c - 1));
    } else {
      onNavigate('levelselect');
    }
  }

  const node = currentNode ? story.nodes[currentNode] : null;
  const isEnding = node?.isEnding;
  const storyParts = !showIntro && displayedText ? parseStoryText(displayedText) : [];
  const voter = players[currentVoter];

  return (
    <div className="scanlines min-h-screen war-room-bg flex flex-col" onClick={skipTyping}>
      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-red-900/40 pointer-events-none" />
      <div className="fixed top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-red-900/40 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-red-900/40 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-red-900/40 pointer-events-none" />

      {/* Top bar */}
      <div className="relative z-10 border-b border-red-900/30 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3 max-w-6xl mx-auto w-full">
          <button
            onClick={(e) => { e.stopPropagation(); handleBack(); }}
            className="pixel-text text-red-800 text-[10px] hover:text-red-500 cursor-pointer flex items-center gap-2"
          >
            <span className="text-lg leading-none">◄</span> RETREAT
          </button>

          <div className="flex items-center gap-6">
            {/* Player indicators */}
            <div className="flex gap-2">
              {players.map(p => (
                <div key={p.id} className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rotate-45" style={{ backgroundColor: p.color }} />
                  <span className="pixel-text text-[7px] hidden md:inline" style={{ color: p.color }}>{p.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-600 rotate-45" style={{ animation: 'pulse-red 2s infinite' }} />
              <div className="text-right">
                <div className="pixel-text text-red-500 text-[10px]">{country?.name}</div>
                <div className="pixel-text text-red-900 text-[8px]">{story.year}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full px-6 md:px-12 py-8">

        {/* Intro */}
        {showIntro && (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-3xl fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-900/50" />
                <span className="pixel-text text-[9px] text-red-700 border border-red-900/50 px-3 py-1 tracking-[4px]">
                  MULTIPLAYER BRIEFING
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-900/50" />
              </div>

              <div className="text-center mb-10">
                <h1 className="pixel-text text-2xl md:text-4xl text-red-500 glow-red mb-3 leading-relaxed">
                  {story.title}
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-red-800" />
                  <span className="pixel-text text-xs text-red-800">{story.year}</span>
                  <div className="h-px w-12 bg-red-800" />
                </div>
              </div>

              <div className="border border-red-900/30 bg-black/40 p-6 md:p-8 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" style={{ animation: 'blink 2s steps(1) infinite' }} />
                  <span className="pixel-text text-[9px] text-amber-700">INCOMING TRANSMISSION</span>
                </div>
                <div className="terminal-text text-xl md:text-2xl text-amber-100/90 leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="text-amber-500 blink">█</span>}
                </div>
              </div>

              {showChoices && (
                <div className="fade-in" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={handleIntroAdvance}
                    className="pixel-btn w-full bg-red-950/60 border-red-700 text-red-100 px-8 py-5 text-xs hover:bg-red-900/80 hover:border-red-400 flex items-center justify-center gap-3"
                  >
                    <span className="text-lg">▶</span> ACCEPT MISSION
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* In-game */}
        {!showIntro && (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 fade-in">
            {/* Story panel */}
            <div className="flex-1 flex flex-col min-w-0">
              {currentNode === 'start' && (
                <div className="mb-4 slide-in-left">
                  <h2 className="pixel-text text-lg md:text-xl text-red-500 glow-red mb-1">{story.title}</h2>
                  <div className="h-px w-20 bg-red-800" />
                </div>
              )}

              <div
                ref={textRef}
                className="flex-1 border border-red-900/20 bg-black/50 p-5 md:p-8 overflow-y-auto"
                style={{ maxHeight: 'calc(100vh - 300px)' }}
              >
                {showChoices && storyParts.length > 0 ? (
                  <div className="space-y-5">
                    {storyParts.map((part, i) => {
                      if (part.type === 'fact') {
                        return (
                          <div key={i} className="border-l-2 border-amber-700/60 bg-amber-950/20 px-4 py-3 my-4">
                            <div className="pixel-text text-[8px] text-amber-700 mb-2 flex items-center gap-2">
                              <span>◆</span> HISTORICAL RECORD
                            </div>
                            <div className="terminal-text text-lg text-amber-200/80 leading-relaxed">{part.text}</div>
                          </div>
                        );
                      }
                      if (part.type === 'lessons') {
                        return (
                          <div key={i} className="border border-green-900/40 bg-green-950/10 p-4 my-4">
                            <div className="pixel-text text-[8px] text-green-600 mb-3 flex items-center gap-2">
                              <span>★</span> KEY INTELLIGENCE
                            </div>
                            <div className="terminal-text text-lg text-green-200/80 leading-relaxed">{part.text}</div>
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="terminal-text text-xl md:text-2xl text-gray-200 leading-relaxed whitespace-pre-line">{part.text}</div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="terminal-text text-xl md:text-2xl text-gray-200 leading-relaxed whitespace-pre-line">
                    {displayedText}
                    {isTyping && <span className="text-red-500 blink">█</span>}
                  </div>
                )}
              </div>

              {isTyping && (
                <div className="pixel-text text-[8px] text-gray-700 text-center mt-3">[ CLICK ANYWHERE TO SKIP ]</div>
              )}
            </div>

            {/* Side panel — voting */}
            {showChoices && (
              <div className="lg:w-80 shrink-0 fade-in-up" onClick={(e) => e.stopPropagation()}>
                {isEnding ? (
                  <div className="border border-red-900/30 bg-black/40 p-5">
                    <div className="pixel-text text-[9px] text-green-600 mb-4 flex items-center gap-2">
                      <span>✓</span> MISSION COMPLETE
                    </div>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { setShowIntro(true); setCurrentNode(null); setHistory([]); setChoicesMade(0); }}
                        className="pixel-btn w-full bg-red-950/40 border-red-800 text-red-200 px-4 py-4 text-[10px] hover:bg-red-900/60 hover:border-red-500"
                      >
                        ↺ REPLAY MISSION
                      </button>
                      <button
                        onClick={() => onNavigate('levelselect')}
                        className="pixel-btn w-full bg-gray-950/40 border-gray-700 text-gray-400 px-4 py-4 text-[10px] hover:bg-gray-900/60 hover:border-gray-500"
                      >
                        ◄ NEW CONFLICT
                      </button>
                    </div>
                  </div>
                ) : !votingPhase ? (
                  <div className="border border-red-900/30 bg-black/40">
                    <div className="border-b border-red-900/30 px-5 py-3 bg-red-950/20">
                      <div className="pixel-text text-[9px] text-red-500 flex items-center gap-2">
                        <span className="text-base blink">⚠</span> GROUP DECISION REQUIRED
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      {node?.choices.map((choice, i) => (
                        <div key={i} className="border border-red-900/30 bg-red-950/10 p-3">
                          <div className="flex items-start gap-3">
                            <div className="pixel-text text-xs text-red-600 bg-red-950/60 w-7 h-7 flex items-center justify-center shrink-0 border border-red-900/40">
                              {String.fromCharCode(65 + i)}
                            </div>
                            <div className="terminal-text text-base text-red-200/70 leading-snug pt-0.5">{choice.text}</div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={startVoting}
                        className="pixel-btn w-full bg-yellow-950/40 border-yellow-700 text-yellow-200 px-4 py-4 text-[10px] hover:bg-yellow-900/50 hover:border-yellow-500 mt-1"
                      >
                        ★ BEGIN VOTE
                      </button>
                    </div>
                  </div>
                ) : voteResult ? (
                  <div className="border border-red-900/30 bg-black/40">
                    <div className="border-b border-green-900/30 px-5 py-3 bg-green-950/20">
                      <div className="pixel-text text-[9px] text-green-500 flex items-center gap-2">
                        <span>★</span> {voteResult.isTie ? 'TIE — RANDOM PICK' : 'VOTE RESULTS'}
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {node?.choices.map((choice, i) => {
                        const count = voteResult.tally[i] || 0;
                        const isWinner = i === voteResult.winner;
                        return (
                          <div key={i} className={`border p-3 ${isWinner ? 'border-green-700/60 bg-green-950/20' : 'border-gray-800/40 bg-black/20 opacity-50'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`pixel-text text-[9px] ${isWinner ? 'text-green-400' : 'text-gray-600'}`}>
                                {isWinner ? '► ' : ''}{choice.text}
                              </span>
                              <span className={`pixel-text text-[10px] ${isWinner ? 'text-green-400' : 'text-gray-600'}`}>{count}</span>
                            </div>
                            <div className="flex gap-1">
                              {players.map(p => votes[p.id] === i ? (
                                <div key={p.id} className="w-3 h-3 rotate-45" style={{ backgroundColor: p.color }} title={p.name} />
                              ) : null)}
                            </div>
                          </div>
                        );
                      })}
                      <button
                        onClick={executeVoteResult}
                        className="pixel-btn w-full bg-green-950/40 border-green-700 text-green-200 px-4 py-4 text-[10px] hover:bg-green-900/50 hover:border-green-500 mt-2"
                      >
                        ▶ PROCEED
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-red-900/30 bg-black/40">
                    <div className="border-b px-5 py-3" style={{ borderColor: `${voter.color}40`, backgroundColor: `${voter.color}10` }}>
                      <div className="pixel-text text-[9px] flex items-center gap-2" style={{ color: voter.color }}>
                        <div className="w-3 h-3 rotate-45" style={{ backgroundColor: voter.color }} />
                        {voter.name}'S VOTE ({currentVoter + 1}/{players.length})
                      </div>
                    </div>
                    <div className="p-4">
                      {currentVoter > 0 && (
                        <div className="flex gap-2 mb-3">
                          {players.slice(0, currentVoter).map(p => (
                            <span key={p.id} className="pixel-text text-[7px] px-2 py-1 border" style={{ borderColor: `${p.color}60`, color: p.color }}>
                              {p.name} ✓
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-col gap-3">
                        {node?.choices.map((choice, i) => (
                          <button
                            key={i}
                            onClick={() => castVote(i)}
                            className="group w-full text-left border hover:brightness-125 transition-all cursor-pointer"
                            style={{
                              backgroundColor: `${voter.color}10`,
                              borderColor: `${voter.color}40`,
                            }}
                          >
                            <div className="flex items-start gap-3 p-3">
                              <div
                                className="pixel-text text-xs w-7 h-7 flex items-center justify-center shrink-0 border"
                                style={{ color: voter.color, borderColor: `${voter.color}40`, backgroundColor: `${voter.color}15` }}
                              >
                                {String.fromCharCode(65 + i)}
                              </div>
                              <div className="terminal-text text-base leading-snug pt-0.5" style={{ color: `${voter.color}cc` }}>
                                {choice.text}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-red-900/20 bg-black/60 px-6 py-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto pixel-text text-[7px] text-red-900/60">
          <span>CHOICE OF WAR // {country?.name} — {story.year} // MULTIPLAYER</span>
          <span>BY LANDON KRUSE</span>
        </div>
      </div>
    </div>
  );
}
