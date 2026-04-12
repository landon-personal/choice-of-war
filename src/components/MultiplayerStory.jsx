import { useState, useEffect } from 'react';
import stories from '../data/stories';
import countries from '../data/countries';

export default function MultiplayerStory({ levelId, players, onNavigate }) {
  const story = stories[levelId];
  const country = countries.available.find(c => c.id === levelId);
  const [currentNode, setCurrentNode] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [history, setHistory] = useState([]);

  // Voting state
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

  function typeText(text) {
    setIsTyping(true);
    setShowChoices(false);
    setVotingPhase(false);
    setVotes({});
    setCurrentVoter(0);
    setVoteResult(null);
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setShowChoices(true);
      }
    }, 15);
    return () => clearInterval(interval);
  }

  function skipTyping() {
    if (isTyping) {
      setIsTyping(false);
      if (showIntro) {
        setDisplayedText(story.intro);
      } else if (currentNode && story.nodes[currentNode]) {
        setDisplayedText(story.nodes[currentNode].text);
      }
      setShowChoices(true);
    }
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
      // All votes in — tally
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

    let winningChoice;
    if (winners.length === 1) {
      winningChoice = parseInt(winners[0]);
    } else {
      // Tie — random pick among tied options
      winningChoice = parseInt(winners[Math.floor(Math.random() * winners.length)]);
    }

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
    } else {
      onNavigate('levelselect');
    }
  }

  const node = currentNode ? story.nodes[currentNode] : null;
  const isEnding = node?.isEnding;
  const voter = players[currentVoter];

  return (
    <div className="scanlines min-h-screen bg-black flex flex-col" onClick={skipTyping}>
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-black to-black" />

      <div className="relative z-10 flex flex-col justify-center min-h-screen p-6 md:p-10 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={(e) => { e.stopPropagation(); handleBack(); }}
            className="pixel-text text-red-700 text-sm hover:text-red-500 cursor-pointer"
          >
            ◄ BACK
          </button>
          <div className="flex items-center gap-4">
            {/* Player indicators */}
            <div className="flex gap-2">
              {players.map(p => (
                <div
                  key={p.id}
                  className="w-3 h-3 rotate-45"
                  style={{ backgroundColor: p.color }}
                  title={p.name}
                />
              ))}
            </div>
            <div className="text-right">
              <div className="pixel-text text-red-500 text-xs">{country?.name}</div>
              <div className="pixel-text text-gray-600 text-[10px]">{story.year}</div>
            </div>
          </div>
        </div>

        {/* Multiplayer badge */}
        <div className="pixel-text text-[10px] text-yellow-600 border border-yellow-800/50 px-3 py-1 inline-block mb-6 self-start">
          ● MULTIPLAYER — {players.length} PLAYERS
        </div>

        {/* Story title */}
        {(showIntro || currentNode === 'start') && (
          <div className="mb-8 fade-in">
            <h2 className="pixel-text text-2xl md:text-3xl text-red-500 glow-red mb-2">
              {story.title}
            </h2>
            <div className="pixel-text text-sm text-red-800">{story.year}</div>
            <div className="w-24 h-0.5 bg-red-800 mt-3" />
          </div>
        )}

        {/* Story text */}
        <div className="mb-8">
          <div className="pixel-text text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-line">
            {displayedText}
            {isTyping && <span className="text-red-500 blink">▮</span>}
          </div>
        </div>

        {/* Choices / Voting */}
        {showChoices && (
          <div className="fade-in" onClick={(e) => e.stopPropagation()}>
            {showIntro ? (
              <button
                onClick={handleIntroAdvance}
                className="pixel-btn w-full bg-red-950/60 border-red-700 text-red-200 px-8 py-4 text-sm hover:bg-red-900/80 hover:border-red-500"
              >
                ▶ BEGIN THE STORY
              </button>
            ) : isEnding ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowIntro(true);
                    setCurrentNode(null);
                    setHistory([]);
                  }}
                  className="pixel-btn w-full bg-red-950/60 border-red-700 text-red-200 px-8 py-4 text-sm hover:bg-red-900/80"
                >
                  ↺ PLAY AGAIN
                </button>
                <button
                  onClick={() => onNavigate('levelselect')}
                  className="pixel-btn w-full bg-gray-950/60 border-gray-700 text-gray-300 px-8 py-4 text-sm hover:bg-gray-900/80"
                >
                  ◄ CHOOSE ANOTHER CONFLICT
                </button>
              </div>
            ) : !votingPhase ? (
              /* Pre-voting: show choices and start vote button */
              <div className="flex flex-col gap-3">
                <div className="pixel-text text-xs text-red-700 mb-2">THE GROUP MUST DECIDE...</div>
                {node?.choices.map((choice, i) => (
                  <div
                    key={i}
                    className="bg-red-950/20 border border-red-900/50 text-red-300 px-6 py-3 text-sm pixel-text"
                  >
                    <span className="text-red-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {choice.text}
                  </div>
                ))}
                <button
                  onClick={startVoting}
                  className="pixel-btn w-full bg-yellow-900/40 border-yellow-600 text-yellow-200 px-8 py-4 text-sm hover:bg-yellow-800/50 mt-2"
                >
                  ★ START VOTING
                </button>
              </div>
            ) : voteResult ? (
              /* Vote results */
              <div className="flex flex-col gap-4">
                <div className="pixel-text text-xs text-yellow-500 mb-1">
                  {voteResult.isTie ? '★ TIE BROKEN BY RANDOM PICK ★' : '★ VOTE RESULTS ★'}
                </div>

                {/* Show vote breakdown */}
                <div className="border border-gray-800 bg-gray-950/60 p-4">
                  {node?.choices.map((choice, i) => {
                    const count = voteResult.tally[i] || 0;
                    const isWinner = i === voteResult.winner;
                    return (
                      <div key={i} className={`flex items-center justify-between py-2 ${isWinner ? 'text-green-400' : 'text-gray-600'}`}>
                        <span className="pixel-text text-xs">
                          {isWinner ? '►' : ' '} {choice.text}
                        </span>
                        <div className="flex items-center gap-2">
                          {players.map(p => {
                            const playerVote = votes[p.id];
                            if (playerVote === i) {
                              return <div key={p.id} className="w-3 h-3 rotate-45" style={{ backgroundColor: p.color }} />;
                            }
                            return null;
                          })}
                          <span className="pixel-text text-xs ml-2">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={executeVoteResult}
                  className="pixel-btn w-full bg-green-900/40 border-green-600 text-green-200 px-8 py-4 text-sm hover:bg-green-800/50"
                >
                  ▶ CONTINUE WITH: {voteResult.choiceText}
                </button>
              </div>
            ) : (
              /* Voting in progress — current player votes */
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rotate-45" style={{ backgroundColor: voter.color }} />
                  <span className="pixel-text text-sm" style={{ color: voter.color }}>
                    {voter.name}'S TURN TO VOTE
                  </span>
                  <span className="pixel-text text-xs text-gray-600">
                    ({currentVoter + 1}/{players.length})
                  </span>
                </div>

                {/* Show who already voted (no spoilers) */}
                {currentVoter > 0 && (
                  <div className="flex gap-2 mb-2">
                    {players.slice(0, currentVoter).map(p => (
                      <span key={p.id} className="pixel-text text-[10px] px-2 py-1 border" style={{ borderColor: p.color, color: p.color }}>
                        {p.name} ✓
                      </span>
                    ))}
                  </div>
                )}

                <div className="pixel-text text-xs text-gray-600 mb-1">
                  PASS THE DEVICE TO {voter.name}
                </div>

                {node?.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => castVote(i)}
                    className="pixel-btn w-full text-left px-6 py-4 text-sm hover:border-red-500"
                    style={{
                      backgroundColor: `${voter.color}15`,
                      borderColor: `${voter.color}60`,
                      color: voter.color,
                    }}
                  >
                    <span className="mr-2 opacity-70">{String.fromCharCode(65 + i)}.</span>
                    {choice.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {isTyping && (
          <div className="pixel-text text-[10px] text-gray-700 text-center mt-4">
            CLICK ANYWHERE TO SKIP
          </div>
        )}
      </div>
    </div>
  );
}
