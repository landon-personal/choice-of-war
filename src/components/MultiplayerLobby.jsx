import { useState } from 'react';

export default function MultiplayerLobby({ onNavigate, onStartMultiplayer }) {
  const [players, setPlayers] = useState([
    { id: 1, name: 'PLAYER 1', color: '#ff4444' },
    { id: 2, name: 'PLAYER 2', color: '#4488ff' },
  ]);
  const [editingId, setEditingId] = useState(null);

  function addPlayer() {
    if (players.length >= 4) return;
    const colors = ['#ff4444', '#4488ff', '#44ff44', '#ffaa00'];
    const newId = Math.max(...players.map(p => p.id)) + 1;
    setPlayers([...players, {
      id: newId,
      name: `PLAYER ${players.length + 1}`,
      color: colors[players.length],
    }]);
  }

  function removePlayer(id) {
    if (players.length <= 2) return;
    setPlayers(players.filter(p => p.id !== id));
  }

  function updateName(id, name) {
    setPlayers(players.map(p => p.id === id ? { ...p, name: name.toUpperCase() } : p));
  }

  return (
    <div className="scanlines min-h-[100dvh] bg-black flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />

      <div className="relative z-10 w-full max-w-lg">
        <button
          onClick={() => onNavigate('gamemodes')}
          className="pixel-text text-red-700 text-[10px] md:text-sm mb-4 md:mb-8 hover:text-red-500 cursor-pointer"
        >
          BACK
        </button>

        <h2 className="pixel-text text-lg md:text-3xl text-red-500 glow-red mb-1 md:mb-2 text-center">
          MULTIPLAYER
        </h2>
        <p className="pixel-text text-[7px] md:text-xs text-gray-500 text-center mb-1 md:mb-2">
          LOCAL CO-OP
        </p>
        <div className="w-16 md:w-32 h-0.5 md:h-1 bg-red-800 mx-auto mb-6 md:mb-10" />

        <div className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-8">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-3 md:gap-4 bg-gray-950/60 border-2 px-3 md:px-5 py-2.5 md:py-4"
              style={{ borderColor: player.color }}
            >
              <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 shrink-0" style={{ backgroundColor: player.color }} />
              {editingId === player.id ? (
                <input
                  autoFocus
                  className="pixel-text text-[9px] md:text-sm bg-transparent border-b border-gray-600 text-white outline-none flex-1 uppercase"
                  value={player.name}
                  maxLength={16}
                  onChange={(e) => updateName(player.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                />
              ) : (
                <span
                  className="pixel-text text-[9px] md:text-sm flex-1 cursor-pointer"
                  style={{ color: player.color }}
                  onClick={() => setEditingId(player.id)}
                >
                  {player.name}
                </span>
              )}
              <button onClick={() => setEditingId(player.id)} className="pixel-text text-xs text-gray-600 hover:text-gray-400">
                ✎
              </button>
              {players.length > 2 && (
                <button onClick={() => removePlayer(player.id)} className="pixel-text text-xs text-red-800 hover:text-red-500">
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {players.length < 4 && (
          <button
            onClick={addPlayer}
            className="pixel-btn w-full bg-gray-950/40 border-gray-700 text-gray-400 px-4 py-2.5 md:py-3 text-[9px] md:text-sm hover:bg-gray-900/60 hover:border-gray-500 mb-4 md:mb-8"
          >
            + ADD PLAYER ({players.length}/4)
          </button>
        )}

        <div className="border border-gray-800 bg-gray-950/40 p-3 md:p-5 mb-4 md:mb-8">
          <div className="pixel-text text-[8px] md:text-xs text-red-600 mb-2 md:mb-3">HOW IT WORKS</div>
          <div className="pixel-text text-[7px] md:text-[11px] text-gray-500 leading-relaxed space-y-1 md:space-y-2">
            <p>READ THE STORY TOGETHER</p>
            <p>EACH PLAYER VOTES ON CHOICES</p>
            <p>MAJORITY DECIDES THE PATH</p>
          </div>
        </div>

        <button
          onClick={() => onStartMultiplayer(players)}
          className="pixel-btn w-full bg-red-900/80 border-red-600 text-red-100 px-6 py-3 md:py-4 text-[10px] md:text-lg hover:bg-red-800"
        >
          CHOOSE A CONFLICT
        </button>
      </div>
    </div>
  );
}
