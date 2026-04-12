import { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import countries from '../data/countries';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const countryGeoNames = {
  cuba: 'Cuba',
  uk: 'United Kingdom',
  china: 'China',
  norway: 'Norway',
  japan: 'Japan',
  italy: 'Italy',
  egypt: 'Egypt',
  usa: 'United States of America',
  argentina: 'Argentina',
  southafrica: 'South Africa',
  australia: 'Australia',
  indonesia: 'Indonesia',
  india: 'India',
  russia: 'Russia',
  france: 'France',
  sudan: 'Sudan',
  ukraine: 'Ukraine',
  mexico: 'Mexico',
  peru: 'Peru',
  venezuela: 'Venezuela',
  mongolia: 'Mongolia',
};

// Reverse lookup: geo name -> country data
function buildGeoLookup() {
  const lookup = {};
  for (const country of countries.available) {
    const geoName = countryGeoNames[country.id];
    if (geoName) {
      lookup[geoName] = country;
    }
  }
  return lookup;
}

export default function LevelSelect({ onNavigate, onSelectLevel }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredGeo, setHoveredGeo] = useState(null);
  const geoLookup = useMemo(buildGeoLookup, []);

  function handleGeoClick(geoName) {
    const country = geoLookup[geoName];
    if (!country) return;

    if (selectedCountry?.id === country.id) {
      onSelectLevel(country.id);
    } else {
      setSelectedCountry(country);
    }
  }

  function getGeoStyle(geoName) {
    const country = geoLookup[geoName];
    const isSelected = country && selectedCountry?.id === country.id;
    const isHovered = geoName === hoveredGeo;
    const isAvailable = !!country;

    if (isSelected) {
      return {
        fill: '#b91c1c',
        stroke: '#f87171',
        strokeWidth: 0.75,
        cursor: 'pointer',
        filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.7))',
      };
    }
    if (isAvailable && isHovered) {
      return {
        fill: '#991b1b',
        stroke: '#ef4444',
        strokeWidth: 0.5,
        cursor: 'pointer',
      };
    }
    if (isAvailable) {
      return {
        fill: '#7f1d1d',
        stroke: '#dc2626',
        strokeWidth: 0.4,
        cursor: 'pointer',
      };
    }
    return {
      fill: '#0d1f3c',
      stroke: '#1e3a5f',
      strokeWidth: 0.3,
      cursor: 'default',
    };
  }

  return (
    <div className="scanlines min-h-[100dvh] bg-[#0a1628] flex flex-col p-3 md:p-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1">
        {/* Header */}
        <button
          onClick={() => onNavigate('gamemodes')}
          className="pixel-text text-red-700 text-[10px] md:text-sm mb-2 md:mb-4 hover:text-red-500 cursor-pointer self-start"
        >
          &lt; BACK
        </button>

        <h2 className="pixel-text text-xs md:text-2xl text-red-500 glow-red mb-0.5 md:mb-1 text-center">
          SELECT CONFLICT ZONE
        </h2>
        <p className="pixel-text text-[7px] md:text-xs text-blue-400/80 text-center mb-2 md:mb-6">
          TAP A HIGHLIGHTED COUNTRY TO BEGIN
        </p>

        {/* Map Container */}
        <div
          className="relative w-full bg-[#0a1628] border border-blue-900/50 md:border-2 md:border-blue-900/80 rounded overflow-hidden flex-shrink-0"
          style={{
            boxShadow: 'inset 0 0 60px rgba(10, 22, 40, 0.8), 0 0 20px rgba(30, 58, 95, 0.3)',
          }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* CRT scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            }}
          />

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 130,
              center: [10, 20],
            }}
            style={{
              width: '100%',
              height: 'auto',
            }}
          >
            <ZoomableGroup
              center={[10, 20]}
              zoom={1}
              minZoom={1}
              maxZoom={6}
            >
              {/* Ocean background */}
              <rect x={-500} y={-500} width={2000} height={2000} fill="#0a1628" />

              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const geoName = geo.properties.name;
                    const style = getGeoStyle(geoName);
                    const isAvailable = !!geoLookup[geoName];
                    const isSelected = isAvailable && selectedCountry?.id === geoLookup[geoName]?.id;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleGeoClick(geoName)}
                        onMouseEnter={() => {
                          if (isAvailable) setHoveredGeo(geoName);
                        }}
                        onMouseLeave={() => setHoveredGeo(null)}
                        style={{
                          default: {
                            fill: style.fill,
                            stroke: style.stroke,
                            strokeWidth: style.strokeWidth,
                            outline: 'none',
                            transition: 'fill 0.2s ease, stroke 0.2s ease',
                          },
                          hover: {
                            fill: isAvailable ? '#991b1b' : '#0d1f3c',
                            stroke: isAvailable ? '#ef4444' : '#1e3a5f',
                            strokeWidth: isAvailable ? 0.5 : 0.3,
                            outline: 'none',
                            cursor: isAvailable ? 'pointer' : 'default',
                          },
                          pressed: {
                            fill: isAvailable ? '#b91c1c' : '#0d1f3c',
                            stroke: isAvailable ? '#f87171' : '#1e3a5f',
                            strokeWidth: isAvailable ? 0.75 : 0.3,
                            outline: 'none',
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Selected Country Info Panel */}
        {selectedCountry ? (
          <div
            className="mt-3 md:mt-5 border border-red-900/60 bg-black/80 rounded p-3 md:p-5 fade-in"
            style={{
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.15), inset 0 0 30px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="pixel-text text-red-400 text-[10px] md:text-sm tracking-wider">
                    {selectedCountry.name}
                  </span>
                </div>
                <div className="terminal-text text-gray-500 text-[7px] md:text-xs mt-1 ml-3.5 md:ml-4">
                  {selectedCountry.region}
                </div>
                <div className="terminal-text text-red-300/70 text-[7px] md:text-xs mt-0.5 ml-3.5 md:ml-4">
                  {selectedCountry.conflict}
                </div>
              </div>
              <button
                onClick={() => onSelectLevel(selectedCountry.id)}
                className="pixel-btn bg-red-950/80 border-red-700 text-red-200 px-4 md:px-8 py-2 md:py-3 text-[9px] md:text-sm hover:bg-red-900/90 hover:border-red-500 shrink-0 tracking-widest transition-colors"
              >
                DEPLOY
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 md:mt-5 text-center">
            <span className="pixel-text text-[7px] md:text-xs text-gray-600 tracking-wider">
              SELECT A RED ZONE TO VIEW INTEL
            </span>
          </div>
        )}

        {/* Legend */}
        <div className="flex justify-center gap-4 md:gap-8 pixel-text text-[7px] md:text-xs mt-3 md:mt-5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-1.5 md:w-4 md:h-2.5 bg-red-900 border border-red-600 rounded-sm" />
            <span className="text-red-400/80">ACTIVE CONFLICT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-1.5 md:w-4 md:h-2.5 bg-[#0d1f3c] border border-blue-900/60 rounded-sm" />
            <span className="text-gray-600">NEUTRAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
