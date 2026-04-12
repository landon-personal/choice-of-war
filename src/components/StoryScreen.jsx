import { useState, useEffect } from 'react';
import stories from '../data/stories';
import countries from '../data/countries';

export default function StoryScreen({ levelId, onNavigate }) {
  const story = stories[levelId];
  const country = countries.available.find(c => c.id === levelId);
  const [currentNode, setCurrentNode] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [history, setHistory] = useState([]);

  // Start intro typewriter
  useEffect(() => {
    if (showIntro) {
      typeText(story.intro);
    }
  }, [showIntro]);

  // Typewriter effect for story nodes
  useEffect(() => {
    if (currentNode && story.nodes[currentNode]) {
      typeText(story.nodes[currentNode].text);
    }
  }, [currentNode]);

  function typeText(text) {
    setIsTyping(true);
    setShowChoices(false);
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

  function handleChoice(nextNode) {
    setHistory(prev => [...prev, currentNode || 'intro']);
    if (showIntro) {
      setShowIntro(false);
      setCurrentNode('start');
    } else {
      setCurrentNode(nextNode);
    }
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

  return (
    <div className="scanlines min-h-screen bg-black flex flex-col" onClick={skipTyping}>
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-black to-black" />

      <div className="relative z-10 flex flex-col min-h-screen p-6 md:p-10 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={(e) => { e.stopPropagation(); handleBack(); }}
            className="pixel-text text-red-700 text-sm hover:text-red-500 cursor-pointer"
          >
            ◄ BACK
          </button>
          <div className="text-right">
            <div className="pixel-text text-red-500 text-xs">{country?.name}</div>
            <div className="pixel-text text-gray-600 text-[10px]">{story.year}</div>
          </div>
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
        <div className="flex-1 mb-8">
          <div className="pixel-text text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-line">
            {displayedText}
            {isTyping && <span className="text-red-500 blink">▮</span>}
          </div>
        </div>

        {/* Choices */}
        {showChoices && (
          <div className="fade-in" onClick={(e) => e.stopPropagation()}>
            {showIntro ? (
              <button
                onClick={() => handleChoice('start')}
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
            ) : (
              <div className="flex flex-col gap-3">
                <div className="pixel-text text-xs text-red-700 mb-2">WHAT DO YOU DO?</div>
                {node?.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(choice.next)}
                    className="pixel-btn w-full text-left bg-red-950/40 border-red-800 text-red-200 px-6 py-4 text-sm hover:bg-red-900/60 hover:border-red-500"
                  >
                    <span className="text-red-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {choice.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Click to skip hint */}
        {isTyping && (
          <div className="pixel-text text-[10px] text-gray-700 text-center mt-4">
            CLICK ANYWHERE TO SKIP
          </div>
        )}
      </div>
    </div>
  );
}
