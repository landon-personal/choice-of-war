import { useState, useEffect } from 'react';

export default function TitleScreen({ onNavigate }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMenu(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="scanlines min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black to-red-950/20" />
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-900/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-16">
        <div className="pixel-text text-sm text-red-500 mb-4 tracking-[8px]">
          ★ ★ ★ PRESENTS ★ ★ ★
        </div>
        <h1 className="pixel-text text-6xl md:text-8xl font-bold text-red-600 glow-red mb-2 leading-tight">
          CHOICE
        </h1>
        <div className="pixel-text text-2xl md:text-3xl text-red-400 mb-2 tracking-[12px]">
          — OF —
        </div>
        <h1 className="pixel-text text-6xl md:text-8xl font-bold text-red-600 glow-red leading-tight">
          WAR
        </h1>
        <div className="pixel-text text-xs text-gray-500 mt-6 tracking-[4px]">
          BY LANDON KRUSE
        </div>
      </div>

      {/* Menu */}
      {showMenu && (
        <div className="relative z-10 flex flex-col gap-4 fade-in">
          <button
            onClick={() => onNavigate('gamemodes')}
            className="pixel-btn bg-red-900/80 border-red-600 text-red-100 px-12 py-4 text-lg hover:bg-red-800"
          >
            ▶ START GAME
          </button>
          <div className="pixel-text text-gray-600 text-xs text-center mt-4">
            PRESS START TO BEGIN
          </div>
        </div>
      )}

      {/* Blinking cursor */}
      <div className="absolute bottom-8 pixel-text text-red-800 text-xs blink">
        ▮
      </div>
    </div>
  );
}
