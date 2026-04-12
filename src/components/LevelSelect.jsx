import { useState } from 'react';
import countries from '../data/countries';

export default function LevelSelect({ onNavigate, onSelectLevel }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  return (
    <div className="scanlines min-h-screen bg-[#0a1628] flex flex-col items-center p-8">
      <div className="w-full max-w-5xl">
        <button
          onClick={() => onNavigate('gamemodes')}
          className="pixel-text text-red-700 text-sm mb-6 hover:text-red-500 cursor-pointer"
        >
          ◄ BACK
        </button>

        <h2 className="pixel-text text-2xl text-red-500 glow-red mb-1 text-center">
          SELECT YOUR CONFLICT
        </h2>
        <p className="pixel-text text-xs text-blue-400 text-center mb-8">
          CHOOSE A COUNTRY TO BEGIN
        </p>

        {/* World Map */}
        <div className="relative w-full aspect-[2/1] bg-[#0d1f3c] border-2 border-blue-900 rounded mb-8 overflow-hidden">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Horizontal grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="rgba(59,130,246,0.15)" strokeWidth="0.2" />
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="rgba(59,130,246,0.15)" strokeWidth="0.2" />
            ))}
            {/* Equator */}
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(59,130,246,0.3)" strokeWidth="0.3" strokeDasharray="1,1" />
          </svg>

          {/* Simplified continent outlines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            {/* North America */}
            <path d="M 15,15 L 25,12 L 38,15 L 42,20 L 40,28 L 38,35 L 42,38 L 38,42 L 34,40 L 30,42 L 25,38 L 20,35 L 15,28 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            {/* South America */}
            <path d="M 38,45 L 42,42 L 48,48 L 52,55 L 55,62 L 52,72 L 48,80 L 42,82 L 38,75 L 36,65 L 35,55 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            {/* Europe */}
            <path d="M 90,14 L 95,12 L 102,14 L 108,16 L 112,20 L 108,25 L 104,28 L 100,30 L 95,28 L 92,25 L 90,20 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            {/* Africa */}
            <path d="M 95,32 L 102,30 L 110,32 L 115,38 L 118,45 L 120,55 L 118,65 L 112,72 L 105,70 L 100,62 L 98,50 L 95,40 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            {/* Asia */}
            <path d="M 112,12 L 125,10 L 140,12 L 155,15 L 168,18 L 175,22 L 172,30 L 165,35 L 155,38 L 148,42 L 140,38 L 130,35 L 120,30 L 115,22 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            {/* Australia */}
            <path d="M 155,60 L 172,58 L 178,62 L 175,70 L 168,72 L 158,68 L 155,64 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
          </svg>

          {/* Available country markers */}
          {countries.available.map((country) => (
            <button
              key={country.id}
              onClick={() => onSelectLevel(country.id)}
              onMouseEnter={() => setHoveredCountry(country)}
              onMouseLeave={() => setHoveredCountry(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-red-600 border-2 border-red-400 rotate-45 group-hover:bg-red-500 group-hover:scale-150 transition-transform"
                     style={{ animation: 'pulse-red 2s infinite' }} />
                <div className="pixel-text absolute top-5 left-1/2 -translate-x-1/2 text-[10px] text-red-400 whitespace-nowrap font-bold">
                  {country.name}
                </div>
              </div>
            </button>
          ))}

          {/* Coming soon markers */}
          {countries.comingSoon.map((country) => (
            <div
              key={country.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
            >
              <div className="w-2 h-2 bg-gray-700 border border-gray-600 rotate-45 opacity-50" />
              <div className="pixel-text absolute top-3 left-1/2 -translate-x-1/2 text-[8px] text-gray-600 whitespace-nowrap">
                {country.name}
              </div>
            </div>
          ))}

          {/* Hover tooltip */}
          {hoveredCountry && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 border border-red-700 px-6 py-3 z-20">
              <div className="pixel-text text-red-400 text-sm">{hoveredCountry.name}</div>
              <div className="pixel-text text-gray-400 text-xs mt-1">{hoveredCountry.region}</div>
              <div className="pixel-text text-red-300 text-xs mt-1">{hoveredCountry.conflict}</div>
              <div className="pixel-text text-yellow-500 text-[10px] mt-2">► CLICK TO BEGIN</div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 pixel-text text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 border border-red-400 rotate-45" />
            <span className="text-red-400">AVAILABLE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-700 border border-gray-600 rotate-45" />
            <span className="text-gray-500">COMING SOON</span>
          </div>
        </div>
      </div>
    </div>
  );
}
