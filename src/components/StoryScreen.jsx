import { useState, useEffect, useRef } from 'react';
import stories from '../data/stories';
import countries from '../data/countries';
import SceneArt from './SceneArt';

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

export default function StoryScreen({ levelId, onNavigate }) {
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

  function handleChoice(nextNode) {
    setHistory(prev => [...prev, currentNode || 'intro']);
    if (showIntro) {
      setShowIntro(false);
      setCurrentNode('start');
    } else {
      setCurrentNode(nextNode);
    }
    setChoicesMade(c => c + 1);
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

  return (
    <div className="scanlines min-h-[100dvh] war-room-bg flex flex-col" onClick={skipTyping}>
      {/* Corner decorations — hidden on mobile */}
      <div className="hidden md:block fixed top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-red-900/30 pointer-events-none" />
      <div className="hidden md:block fixed top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-red-900/30 pointer-events-none" />
      <div className="hidden md:block fixed bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-red-900/30 pointer-events-none" />
      <div className="hidden md:block fixed bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-red-900/30 pointer-events-none" />

      {/* Top bar */}
      <div className="relative z-10 border-b border-red-900/30 bg-black/80">
        <div className="flex items-center justify-between px-3 md:px-5 py-2 md:py-2.5 max-w-4xl mx-auto w-full">
          <button
            onClick={(e) => { e.stopPropagation(); handleBack(); }}
            className="pixel-text text-red-800 text-[8px] md:text-[10px] hover:text-red-400 cursor-pointer"
          >
            BACK
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              {Array.from({ length: Math.min(choicesMade + 1, 8) }).map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 ${i === choicesMade ? 'bg-red-500' : 'bg-red-900/50'}`} />
              ))}
            </div>
            <div className="pixel-text text-red-500 text-[8px] md:text-[10px]">
              {country?.name} / {story.year}
            </div>
          </div>
        </div>
      </div>

      {/* Main content — single column, centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-3 md:px-6 py-4 md:py-8 w-full">
        <div className="w-full max-w-3xl">

          {/* === INTRO SCREEN === */}
          {showIntro && (
            <div className="fade-in-up">
              <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-900/50" />
                <span className="pixel-text text-[7px] md:text-[9px] text-red-700 border border-red-900/50 px-2 md:px-3 py-1 tracking-[2px] md:tracking-[4px]">
                  CLASSIFIED
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-900/50" />
              </div>

              <div className="text-center mb-6 md:mb-10">
                <h1 className="pixel-text text-sm md:text-3xl text-red-500 glow-red mb-2 md:mb-4 leading-relaxed">
                  {story.title}
                </h1>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-8 md:w-12 bg-red-800" />
                  <span className="pixel-text text-[8px] md:text-[10px] text-red-800">{story.year}</span>
                  <div className="h-px w-8 md:w-12 bg-red-800" />
                </div>
              </div>

              <SceneArt levelId={levelId} nodeId={null} isIntro={true} />

              <div className="border border-red-900/30 bg-black/40 p-4 md:p-8 mb-4 md:mb-8">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full blink" />
                  <span className="pixel-text text-[6px] md:text-[8px] text-amber-700">INCOMING TRANSMISSION</span>
                </div>
                <div className="terminal-text text-base md:text-2xl text-amber-100/90 leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="text-amber-500 blink">█</span>}
                </div>
              </div>

              {showChoices && (
                <div className="fade-in" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleChoice('start')}
                    className="pixel-btn w-full bg-red-950/60 border-red-700 text-red-100 px-6 py-3 md:px-8 md:py-5 text-[8px] md:text-[10px] hover:bg-red-900/80 hover:border-red-400"
                  >
                    ACCEPT MISSION
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === IN-GAME STORY === */}
          {!showIntro && (
            <div className="fade-in flex flex-col">

              {/* Title on first node */}
              {currentNode === 'start' && (
                <div className="mb-3 md:mb-5">
                  <h2 className="pixel-text text-[9px] md:text-lg text-red-500 glow-red mb-1">
                    {story.title}
                  </h2>
                  <div className="h-px w-12 md:w-16 bg-red-800" />
                </div>
              )}

              {/* Scene illustration */}
              <SceneArt levelId={levelId} nodeId={currentNode} isIntro={false} />

              {/* Story text */}
              <div
                ref={textRef}
                className="border border-red-900/20 bg-black/50 p-3 md:p-8 overflow-y-auto mb-4 md:mb-6"
                style={{ maxHeight: '40vh' }}
              >
                {showChoices && storyParts.length > 0 ? (
                  <div className="space-y-3 md:space-y-5">
                    {storyParts.map((part, i) => {
                      if (part.type === 'fact') {
                        return (
                          <div key={i} className="border-l-2 border-amber-700/60 bg-amber-950/20 px-3 md:px-4 py-2 md:py-3">
                            <div className="pixel-text text-[6px] md:text-[7px] text-amber-700 mb-1.5 md:mb-2">
                              HISTORICAL RECORD
                            </div>
                            <div className="terminal-text text-sm md:text-lg text-amber-200/80 leading-relaxed">
                              {part.text}
                            </div>
                          </div>
                        );
                      }
                      if (part.type === 'lessons') {
                        return (
                          <div key={i} className="border border-green-900/40 bg-green-950/10 p-3 md:p-4">
                            <div className="pixel-text text-[6px] md:text-[7px] text-green-600 mb-2 md:mb-3">
                              KEY INTELLIGENCE
                            </div>
                            <div className="terminal-text text-sm md:text-lg text-green-200/80 leading-relaxed">
                              {part.text}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="terminal-text text-base md:text-2xl text-gray-200 leading-relaxed whitespace-pre-line">
                          {part.text}
                        </div>
                      );
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
                <div className="pixel-text text-[6px] md:text-[7px] text-gray-700 text-center mb-3 md:mb-4">
                  [ TAP TO SKIP ]
                </div>
              )}

              {/* === CHOICES — full width below story === */}
              {showChoices && (
                <div className="fade-in-up" onClick={(e) => e.stopPropagation()}>
                  {isEnding ? (
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <button
                        onClick={() => {
                          setShowIntro(true);
                          setCurrentNode(null);
                          setHistory([]);
                          setChoicesMade(0);
                        }}
                        className="pixel-btn flex-1 bg-red-950/40 border-red-800 text-red-200 px-4 md:px-6 py-3 md:py-5 text-[8px] md:text-[10px] hover:bg-red-900/60 hover:border-red-500"
                      >
                        REPLAY
                      </button>
                      <button
                        onClick={() => onNavigate('levelselect')}
                        className="pixel-btn flex-1 bg-gray-950/40 border-gray-700 text-gray-400 px-4 md:px-6 py-3 md:py-5 text-[8px] md:text-[10px] hover:bg-gray-900/60 hover:border-gray-500"
                      >
                        NEW CONFLICT
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="pixel-text text-[7px] md:text-[8px] text-red-600 mb-3 md:mb-4 flex items-center gap-2">
                        <span className="blink">!</span> WHAT DO YOU DO?
                      </div>
                      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3">
                        {node?.choices.map((choice, i) => (
                          <button
                            key={i}
                            onClick={() => handleChoice(choice.next)}
                            className="group w-full text-left border-2 border-red-900/40 bg-red-950/10 hover:bg-red-900/30 hover:border-red-500 transition-all duration-150 cursor-pointer active:bg-red-900/40"
                          >
                            <div className="flex items-start gap-3 md:gap-4 p-3 md:p-5">
                              <div className="pixel-text text-[10px] md:text-sm text-red-500 bg-red-950/60 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center shrink-0 border border-red-800/50 group-hover:bg-red-700/60 group-hover:text-white">
                                {String.fromCharCode(65 + i)}
                              </div>
                              <div className="terminal-text text-sm md:text-xl text-red-200/80 group-hover:text-red-100 leading-snug pt-0.5 md:pt-1">
                                {choice.text}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-red-900/20 bg-black/80 px-3 md:px-5 py-1.5 md:py-2">
        <div className="flex items-center justify-between max-w-4xl mx-auto pixel-text text-[5px] md:text-[7px] text-red-900/50">
          <span>{country?.name} — {story.year}</span>
          <span>LANDON KRUSE</span>
        </div>
      </div>
    </div>
  );
}
