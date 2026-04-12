// Pixel-art style scene illustrations rendered with CSS/SVG
// Each scene is a small atmospheric visual that matches the story moment

const scenes = {
  // Cuba
  'cuba:start': { type: 'city', time: 'night', elements: ['buildings', 'military', 'family'] },
  'cuba:flee_country': { type: 'road', time: 'day', elements: ['convoy', 'refugees', 'mountains'] },
  'cuba:build_shelter': { type: 'interior', time: 'night', elements: ['shelter', 'radio', 'family'] },
  'cuba:talk_checkpoint': { type: 'checkpoint', time: 'day', elements: ['soldiers', 'barrier'] },
  'cuba:jungle_path': { type: 'jungle', time: 'day', elements: ['trees', 'path'] },
  'cuba:radio_updates': { type: 'interior', time: 'night', elements: ['radio', 'family'] },
  'cuba:help_neighbors': { type: 'city', time: 'night', elements: ['buildings', 'people'] },

  // UK
  'uk:start': { type: 'city', time: 'night', elements: ['bombs', 'searchlights', 'buildings'] },
  'uk:underground': { type: 'interior', time: 'night', elements: ['tunnel', 'crowd'] },
  'uk:anderson': { type: 'exterior', time: 'night', elements: ['shelter', 'explosions'] },
  'uk:fire_watch': { type: 'rooftop', time: 'night', elements: ['fire', 'cathedral', 'planes'] },

  // China
  'china:start': { type: 'village', time: 'day', elements: ['fire', 'soldiers', 'family'] },
  'china:run_south': { type: 'field', time: 'day', elements: ['refugees', 'path'] },
  'china:safety_zone': { type: 'compound', time: 'day', elements: ['walls', 'crowd', 'flag'] },

  // Norway
  'norway:start': { type: 'village', time: 'night', elements: ['snow', 'soldiers', 'mountains'] },
  'norway:join_resistance': { type: 'mountain', time: 'night', elements: ['cabin', 'snow', 'figures'] },
  'norway:sabotage_mission': { type: 'industrial', time: 'night', elements: ['factory', 'snow', 'figures'] },

  // Japan
  'japan:start': { type: 'city', time: 'day', elements: ['school', 'plane', 'sky'] },
  'japan:the_flash': { type: 'destruction', time: 'day', elements: ['flash', 'ruins'] },
  'japan:search_family': { type: 'ruins', time: 'day', elements: ['rubble', 'fire', 'figure'] },

  // Italy
  'italy:start': { type: 'city', time: 'night', elements: ['rome', 'soldiers', 'monuments'] },
  'italy:join_partisans': { type: 'alley', time: 'night', elements: ['figures', 'walls'] },
  'italy:hide_jews': { type: 'interior', time: 'night', elements: ['family', 'hiding'] },
};

// Get a scene key from levelId and nodeId
function getSceneKey(levelId, nodeId) {
  const key = `${levelId}:${nodeId}`;
  if (scenes[key]) return key;
  // Try to find a partial match
  const candidates = Object.keys(scenes).filter(k => k.startsWith(levelId + ':'));
  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  return null;
}

// Color palettes for different scene types
const palettes = {
  night: { sky: '#0a0a1a', ground: '#1a1a0a', accent: '#ff4444', stars: true },
  day: { sky: '#1a2a3a', ground: '#2a1a0a', accent: '#ff8844', stars: false },
};

export default function SceneArt({ levelId, nodeId, isIntro }) {
  const sceneKey = isIntro ? null : getSceneKey(levelId, nodeId);
  const scene = sceneKey ? scenes[sceneKey] : null;
  const palette = scene ? palettes[scene.time || 'night'] : palettes.night;

  return (
    <div className="w-full h-28 md:h-40 relative overflow-hidden border border-red-900/20 bg-black mb-3 md:mb-4"
         style={{ imageRendering: 'pixelated' }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, ${palette.sky} 0%, ${palette.sky}cc 60%, ${palette.ground} 100%)`
      }} />

      {/* Stars for night scenes */}
      {palette.stars && (
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="absolute bg-white" style={{
              width: '2px', height: '2px',
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 23 + 7) % 50}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }} />
          ))}
        </div>
      )}

      {/* Scene-specific elements */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 128" preserveAspectRatio="xMidYMax slice">
        {/* Ground line */}
        <rect x="0" y="96" width="320" height="32" fill={palette.ground} />
        <line x1="0" y1="96" x2="320" y2="96" stroke="#333" strokeWidth="1" />

        {scene?.type === 'city' && (
          <>
            {/* Buildings */}
            <rect x="20" y="40" width="24" height="56" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="50" y="50" width="20" height="46" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="80" y="30" width="28" height="66" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="120" y="45" width="22" height="51" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="150" y="35" width="30" height="61" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="190" y="55" width="18" height="41" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="220" y="42" width="26" height="54" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="260" y="48" width="20" height="48" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            <rect x="290" y="38" width="24" height="58" fill="#1a1a2a" stroke="#333" strokeWidth="1" />
            {/* Windows - lit */}
            {[25,55,85,125,155,225,265,295].map((x, i) => (
              <rect key={i} x={x} y={50 + (i % 3) * 12} width="4" height="4" fill="#ffaa44" opacity={Math.random() > 0.3 ? 0.8 : 0.2} />
            ))}
            {scene.elements?.includes('bombs') && (
              <>
                <circle cx="100" cy="20" r="3" fill="#ff4444" opacity="0.8" />
                <circle cx="200" cy="15" r="2" fill="#ff6644" opacity="0.6" />
                <line x1="100" y1="23" x2="105" y2="45" stroke="#ff4444" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
              </>
            )}
            {scene.elements?.includes('searchlights') && (
              <>
                <line x1="80" y1="30" x2="40" y2="5" stroke="#aaccff" strokeWidth="2" opacity="0.15" />
                <line x1="220" y1="42" x2="280" y2="5" stroke="#aaccff" strokeWidth="2" opacity="0.15" />
              </>
            )}
          </>
        )}

        {scene?.type === 'village' && (
          <>
            <rect x="40" y="65" width="30" height="31" fill="#2a1a0a" stroke="#333" strokeWidth="1" />
            <polygon points="40,65 55,50 70,65" fill="#3a2a1a" stroke="#333" strokeWidth="1" />
            <rect x="120" y="70" width="25" height="26" fill="#2a1a0a" stroke="#333" strokeWidth="1" />
            <polygon points="120,70 132,55 145,70" fill="#3a2a1a" stroke="#333" strokeWidth="1" />
            <rect x="220" y="68" width="28" height="28" fill="#2a1a0a" stroke="#333" strokeWidth="1" />
            <polygon points="220,68 234,53 248,68" fill="#3a2a1a" stroke="#333" strokeWidth="1" />
            {scene.elements?.includes('fire') && (
              <>
                <rect x="180" y="50" width="20" height="46" fill="#1a0a0a" stroke="#333" strokeWidth="1" />
                <rect x="178" y="40" width="24" height="14" fill="#ff4400" opacity="0.6" />
                <rect x="182" y="36" width="16" height="8" fill="#ff8800" opacity="0.5" />
              </>
            )}
            {scene.elements?.includes('snow') && (
              <>
                {Array.from({ length: 20 }).map((_, i) => (
                  <rect key={i} x={(i * 17 + 5) % 310} y={(i * 13 + 3) % 90} width="2" height="2" fill="white" opacity="0.4" />
                ))}
              </>
            )}
          </>
        )}

        {scene?.type === 'mountain' && (
          <>
            <polygon points="0,96 60,30 120,96" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
            <polygon points="80,96 160,20 240,96" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
            <polygon points="200,96 280,35 320,96" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
            {/* Snow caps */}
            <polygon points="50,38 60,30 70,38" fill="#ddeeff" opacity="0.6" />
            <polygon points="148,28 160,20 172,28" fill="#ddeeff" opacity="0.6" />
            <polygon points="270,42 280,35 290,42" fill="#ddeeff" opacity="0.6" />
            {scene.elements?.includes('cabin') && (
              <>
                <rect x="140" y="75" width="16" height="12" fill="#3a2a1a" />
                <polygon points="138,75 148,66 158,75" fill="#4a3a2a" />
                <rect x="146" y="79" width="4" height="4" fill="#ffaa44" opacity="0.7" />
              </>
            )}
          </>
        )}

        {scene?.type === 'road' && (
          <>
            <rect x="0" y="88" width="320" height="8" fill="#3a3a2a" />
            <line x1="0" y1="92" x2="320" y2="92" stroke="#ffff00" strokeWidth="1" strokeDasharray="8,8" opacity="0.4" />
            {scene.elements?.includes('convoy') && (
              <>
                <rect x="60" y="78" width="24" height="12" fill="#3a4a3a" stroke="#2a3a2a" strokeWidth="1" />
                <rect x="130" y="78" width="24" height="12" fill="#3a4a3a" stroke="#2a3a2a" strokeWidth="1" />
                <rect x="200" y="78" width="24" height="12" fill="#3a4a3a" stroke="#2a3a2a" strokeWidth="1" />
              </>
            )}
            {scene.elements?.includes('refugees') && (
              <>
                {[40, 100, 170, 250].map((x, i) => (
                  <g key={i}>
                    <rect x={x} y="82" width="4" height="8" fill="#6a5a4a" />
                    <circle cx={x + 2} cy="80" r="3" fill="#8a7a6a" />
                  </g>
                ))}
              </>
            )}
          </>
        )}

        {scene?.type === 'destruction' && (
          <>
            <circle cx="160" cy="30" r="40" fill="#ffffff" opacity="0.3" />
            <circle cx="160" cy="30" r="25" fill="#ffffff" opacity="0.5" />
            <circle cx="160" cy="30" r="10" fill="#ffffff" opacity="0.9" />
            {/* Ruined buildings */}
            <polygon points="30,96 35,60 45,55 50,70 55,96" fill="#2a1a1a" />
            <polygon points="80,96 85,65 95,72 100,96" fill="#2a1a1a" />
            <polygon points="240,96 250,70 260,68 270,96" fill="#2a1a1a" />
          </>
        )}

        {scene?.type === 'ruins' && (
          <>
            <polygon points="20,96 25,70 40,65 50,75 55,96" fill="#2a1a0a" />
            <polygon points="70,96 80,60 100,55 110,96" fill="#2a1a0a" />
            <rect x="140" y="72" width="30" height="24" fill="#2a1a0a" stroke="#3a2a1a" />
            <polygon points="230,96 240,68 260,96" fill="#2a1a0a" />
            {scene.elements?.includes('fire') && (
              <>
                <rect x="90" y="48" width="12" height="12" fill="#ff4400" opacity="0.5" />
                <rect x="92" y="44" width="8" height="8" fill="#ff8800" opacity="0.4" />
              </>
            )}
          </>
        )}

        {scene?.type === 'interior' && (
          <>
            {/* Room walls */}
            <rect x="20" y="20" width="280" height="76" fill="#1a1a0a" stroke="#2a2a1a" strokeWidth="1" />
            <line x1="20" y1="20" x2="40" y2="40" stroke="#2a2a1a" strokeWidth="1" />
            <line x1="300" y1="20" x2="280" y2="40" stroke="#2a2a1a" strokeWidth="1" />
            {scene.elements?.includes('radio') && (
              <g>
                <rect x="140" y="55" width="16" height="12" fill="#3a3a2a" stroke="#4a4a3a" strokeWidth="1" />
                <circle cx="148" cy="61" r="3" fill="#2a2a1a" stroke="#4a4a3a" strokeWidth="0.5" />
                <rect x="145" y="56" width="6" height="2" fill="#44aa44" opacity="0.7" />
              </g>
            )}
            {scene.elements?.includes('family') && (
              <>
                {[80, 110, 200, 230].map((x, i) => (
                  <g key={i}>
                    <rect x={x} y="68" width="5" height="12" fill="#6a5a4a" />
                    <circle cx={x + 2.5} cy="65" r="3.5" fill="#8a7a6a" />
                  </g>
                ))}
              </>
            )}
          </>
        )}

        {scene?.type === 'field' && (
          <>
            {/* Rice paddies / fields */}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="0" y1={70 + i * 4} x2="320" y2={70 + i * 4} stroke="#2a4a2a" strokeWidth="0.5" opacity="0.5" />
            ))}
            {scene.elements?.includes('refugees') && (
              <>
                {[50, 90, 140, 200, 260].map((x, i) => (
                  <g key={i}>
                    <rect x={x} y={76 - i * 2} width="4" height="10" fill="#5a4a3a" />
                    <circle cx={x + 2} cy={73 - i * 2} r="3" fill="#7a6a5a" />
                  </g>
                ))}
              </>
            )}
          </>
        )}

        {scene?.type === 'jungle' && (
          <>
            {/* Trees */}
            {[20, 60, 110, 170, 230, 280].map((x, i) => (
              <g key={i}>
                <rect x={x + 4} y={55 + (i % 2) * 10} width="4" height={30 - (i % 2) * 10} fill="#2a1a0a" />
                <circle cx={x + 6} cy={50 + (i % 2) * 10} r={12 + (i % 3) * 3} fill="#1a3a1a" opacity="0.8" />
              </g>
            ))}
            {scene.elements?.includes('path') && (
              <path d="M 0,90 Q 80,85 160,88 Q 240,91 320,86" fill="none" stroke="#4a3a2a" strokeWidth="4" opacity="0.6" />
            )}
          </>
        )}

        {scene?.type === 'industrial' && (
          <>
            <rect x="80" y="30" width="60" height="66" fill="#2a2a3a" stroke="#3a3a4a" strokeWidth="1" />
            <rect x="160" y="40" width="50" height="56" fill="#2a2a3a" stroke="#3a3a4a" strokeWidth="1" />
            {/* Chimney */}
            <rect x="100" y="10" width="10" height="20" fill="#3a3a4a" />
            <rect x="175" y="15" width="8" height="25" fill="#3a3a4a" />
            {/* Pipe system */}
            <line x1="140" y1="60" x2="160" y2="60" stroke="#4a4a5a" strokeWidth="3" />
          </>
        )}

        {scene?.type === 'compound' && (
          <>
            <rect x="40" y="50" width="240" height="46" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="1" />
            <rect x="40" y="45" width="240" height="5" fill="#2a2a3a" />
            {/* Gate */}
            <rect x="148" y="60" width="24" height="36" fill="#2a2a0a" stroke="#3a3a2a" strokeWidth="1" />
            {scene.elements?.includes('flag') && (
              <g>
                <rect x="155" y="35" width="1" height="20" fill="#5a5a5a" />
                <rect x="156" y="35" width="12" height="8" fill="#ff4444" opacity="0.7" />
              </g>
            )}
            {scene.elements?.includes('crowd') && (
              <>
                {Array.from({ length: 12 }).map((_, i) => (
                  <g key={i}>
                    <circle cx={60 + i * 18} cy={82} r="2.5" fill="#7a6a5a" />
                    <rect x={58.5 + i * 18} y={84} width="3" height="7" fill="#6a5a4a" />
                  </g>
                ))}
              </>
            )}
          </>
        )}

        {/* Default: simple landscape if no scene found */}
        {!scene && (
          <>
            <polygon points="0,96 80,50 160,96" fill="#1a1a1a" opacity="0.5" />
            <polygon points="160,96 260,40 320,96" fill="#1a1a1a" opacity="0.5" />
          </>
        )}

        {/* Figures for any scene with soldiers */}
        {scene?.elements?.includes('soldiers') && (
          <>
            {[260, 280, 300].map((x, i) => (
              <g key={i}>
                <rect x={x} y="80" width="5" height="10" fill="#3a4a3a" />
                <circle cx={x + 2.5} cy="77" r="3" fill="#4a5a4a" />
                <line x1={x + 5} y1="84" x2={x + 12} y2="82" stroke="#5a5a5a" strokeWidth="1" />
              </g>
            ))}
          </>
        )}
      </svg>

      {/* Scene label */}
      <div className="absolute bottom-1 left-2 pixel-text text-[5px] md:text-[6px] text-red-900/40">
        {isIntro ? 'BRIEFING' : nodeId?.replace(/_/g, ' ').toUpperCase() || 'FIELD REPORT'}
      </div>
    </div>
  );
}
