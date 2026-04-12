import { useState } from 'react';
import countries from '../data/countries';

export default function LevelSelect({ onNavigate, onSelectLevel }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleTapCountry(country) {
    // On mobile, first tap selects/shows info, second tap enters
    if (selectedCountry?.id === country.id) {
      onSelectLevel(country.id);
    } else {
      setSelectedCountry(country);
    }
  }

  return (
    <div className="scanlines min-h-[100dvh] bg-[#0a1628] flex flex-col p-3 md:p-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1">
        <button
          onClick={() => onNavigate('gamemodes')}
          className="pixel-text text-red-700 text-[10px] md:text-sm mb-3 md:mb-6 hover:text-red-500 cursor-pointer self-start"
        >
          BACK
        </button>

        <h2 className="pixel-text text-xs md:text-2xl text-red-500 glow-red mb-1 text-center">
          SELECT CONFLICT
        </h2>
        <p className="pixel-text text-[7px] md:text-xs text-blue-400 text-center mb-3 md:mb-8">
          TAP A COUNTRY TO BEGIN
        </p>

        {/* World Map */}
        <div className="relative w-full aspect-[2/1] bg-[#0d1f3c] border border-blue-900/60 md:border-2 md:border-blue-900 rounded overflow-hidden flex-shrink-0">
          {/* Grid */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="rgba(59,130,246,0.1)" strokeWidth="0.2" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="rgba(59,130,246,0.1)" strokeWidth="0.2" />
            ))}
          </svg>

          {/* Continents */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            <path d="M 15,15 L 25,12 L 38,15 L 42,20 L 40,28 L 38,35 L 42,38 L 38,42 L 34,40 L 30,42 L 25,38 L 20,35 L 15,28 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <path d="M 38,45 L 42,42 L 48,48 L 52,55 L 55,62 L 52,72 L 48,80 L 42,82 L 38,75 L 36,65 L 35,55 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <path d="M 90,14 L 95,12 L 102,14 L 108,16 L 112,20 L 108,25 L 104,28 L 100,30 L 95,28 L 92,25 L 90,20 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <path d="M 95,32 L 102,30 L 110,32 L 115,38 L 118,45 L 120,55 L 118,65 L 112,72 L 105,70 L 100,62 L 98,50 L 95,40 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <path d="M 112,12 L 125,10 L 140,12 L 155,15 L 168,18 L 175,22 L 172,30 L 165,35 L 155,38 L 148,42 L 140,38 L 130,35 L 120,30 L 115,22 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <path d="M 155,60 L 172,58 L 178,62 L 175,70 L 168,72 L 158,68 L 155,64 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          </svg>

          {/* Available countries */}
          {countries.available.map((country) => (
            <button
              key={country.id}
              onClick={() => handleTapCountry(country)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
            >
              <div className="relative">
                <div
                  className={`w-2.5 h-2.5 md:w-4 md:h-4 bg-red-600 border border-red-400 md:border-2 rotate-45 transition-transform ${
                    selectedCountry?.id === country.id ? 'scale-150 bg-red-500' : 'group-hover:scale-150'
                  }`}
                  style={{ animation: 'pulse-red 2s infinite' }}
                />
                <div className={`pixel-text absolute top-3 md:top-5 left-1/2 -translate-x-1/2 text-[5px] md:text-[10px] whitespace-nowrap font-bold ${
                  selectedCountry?.id === country.id ? 'text-red-300' : 'text-red-400/70'
                }`}>
                  {country.name}
                </div>
              </div>
            </button>
          ))}

          {/* Coming soon — hide labels on mobile to reduce clutter */}
          {countries.comingSoon.map((country) => (
            <div
              key={country.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
            >
              <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-700 border border-gray-600 rotate-45 opacity-40" />
              <div className="pixel-text absolute top-2 md:top-3 left-1/2 -translate-x-1/2 text-[4px] md:text-[8px] text-gray-600/60 whitespace-nowrap hidden md:block">
                {country.name}
              </div>
            </div>
          ))}
        </div>

        {/* Selected country info — replaces hover tooltip for mobile */}
        {selectedCountry && (
          <div className="mt-3 md:mt-6 border border-red-800/60 bg-black/80 p-3 md:p-4 fade-in">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="pixel-text text-red-400 text-[9px] md:text-sm">{selectedCountry.name}</div>
                <div className="pixel-text text-gray-500 text-[7px] md:text-xs mt-0.5">{selectedCountry.region}</div>
                <div className="pixel-text text-red-300/80 text-[7px] md:text-xs mt-0.5">{selectedCountry.conflict}</div>
              </div>
              <button
                onClick={() => onSelectLevel(selectedCountry.id)}
                className="pixel-btn bg-red-950/60 border-red-700 text-red-200 px-3 md:px-6 py-2 md:py-3 text-[8px] md:text-xs hover:bg-red-900/80 shrink-0"
              >
                PLAY
              </button>
            </div>
          </div>
        )}

        {!selectedCountry && (
          <div className="mt-3 md:mt-6 text-center pixel-text text-[7px] md:text-xs text-gray-600">
            TAP A RED MARKER TO SELECT
          </div>
        )}

        {/* Legend */}
        <div className="flex justify-center gap-4 md:gap-8 pixel-text text-[7px] md:text-xs mt-3 md:mt-6">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-red-600 border border-red-400 rotate-45" />
            <span className="text-red-400">AVAILABLE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-700 border border-gray-600 rotate-45" />
            <span className="text-gray-500">COMING SOON</span>
          </div>
        </div>
      </div>
    </div>
  );
}
