export default function GameModes({ onNavigate, onSelectMode }) {
  const modes = [
    { id: 'solo', name: 'SOLO', desc: 'Play through historical conflicts alone', available: true },
    { id: 'multiplayer', name: 'MULTIPLAYER', desc: 'Vote on decisions with friends (2-4 players)', available: true },
    { id: 'story', name: 'STORY MODE', desc: 'A connected campaign through history', available: false },
    { id: 'solo-bots', name: 'SOLO WITH BOTS', desc: 'Play against AI opponents', available: false },
  ];

  return (
    <div className="scanlines min-h-[100dvh] bg-black flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />

      <div className="relative z-10 w-full max-w-lg">
        <button
          onClick={() => onNavigate('title')}
          className="pixel-text text-red-700 text-[10px] md:text-sm mb-6 md:mb-8 hover:text-red-500 cursor-pointer"
        >
          BACK
        </button>

        <h2 className="pixel-text text-lg md:text-3xl text-red-500 glow-red mb-2 text-center">
          SELECT MODE
        </h2>
        <div className="w-20 md:w-32 h-1 bg-red-800 mx-auto mb-6 md:mb-10" />

        <div className="flex flex-col gap-3 md:gap-4">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => mode.available && onSelectMode(mode.id)}
              disabled={!mode.available}
              className={`pixel-btn text-left px-4 md:px-8 py-3 md:py-5 ${
                mode.available
                  ? 'bg-red-950/60 border-red-700 text-red-100 hover:bg-red-900/80 hover:border-red-500'
                  : 'bg-gray-950/60 border-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-center gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] md:text-lg">{mode.name}</div>
                  <div className="text-[8px] md:text-xs mt-1 opacity-70 normal-case tracking-normal leading-relaxed">
                    {mode.desc}
                  </div>
                </div>
                {!mode.available && (
                  <span className="pixel-text text-[7px] md:text-xs text-yellow-600 border border-yellow-800 px-1.5 md:px-2 py-0.5 md:py-1 shrink-0 whitespace-nowrap">
                    SOON
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
