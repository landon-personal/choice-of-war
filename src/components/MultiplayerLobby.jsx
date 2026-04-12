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
    <div className="scanlines min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />

      <div className="relative z-10 w-full max-w-lg">
        <button
          onClick={() => onNavigate('gamemodes')}
          className="pixel-text text-red-700 text-sm mb-8 hover:text-red-500 cursor-pointer"
        >
          ◄ BACK
        </button>

        <h2 className="pixel-text text-3xl text-red-500 glow-red mb-2 text-center">
          MULTIPLAYER
        </h2>
        <p className="pixel-text text-xs text-gray-500 text-center mb-2">
          LOCAL CO-OP — VOTE ON EVERY DECISION
        </p>
        <div className="w-32 h-1 bg-red-800 mx-auto mb-10" />

        {/* Players list */}
        <div className="flex flex-col gap-3 mb-8">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-4 bg-gray-950/60 border-2 px-5 py-4"
              style={{ borderColor: player.color }}
            >
              <div
                className="w-4 h-4 rotate-45 shrink-0"
                style={{ backgroundColor: player.color }}
              />
              {editingId === player.id ? (
                <input
                  autoFocus
                  className="pixel-text text-sm bg-transparent border-b border-gray-600 text-white outline-none flex-1 uppercase"
                  value={player.name}
                  maxLength={16}
                  onChange={(e) => updateName(player.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                />
              ) : (
                <span
                  className="pixel-text text-sm flex-1 cursor-pointer hover:text-gray-300"
                  style={{ color: player.color }}
                  onClick={() => setEditingId(player.id)}
                >
                  {player.name}
                </span>
              )}
              <button
                onClick={() => setEditingId(player.id)}
                className="pixel-text text-xs text-gray-600 hover:text-gray-400"
              >
                ✎
              </button>
              {players.length > 2 && (
                <button
                  onClick={() => removePlayer(player.id)}
                  className="pixel-text text-xs text-red-800 hover:text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add player button */}
        {players.length < 4 && (
          <button
            onClick={addPlayer}
            className="pixel-btn w-full bg-gray-950/40 border-gray-700 text-gray-400 px-6 py-3 text-sm hover:bg-gray-900/60 hover:border-gray-500 mb-8"
          >
            + ADD PLAYER ({players.length}/4)
          </button>
        )}

        {/* How it works */}
        <div className="border border-gray-800 bg-gray-950/40 p-5 mb-8">
          <div className="pixel-text text-xs text-red-600 mb-3">HOW IT WORKS</div>
          <div className="pixel-text text-[11px] text-gray-500 leading-relaxed space-y-2">
            <p>• ALL PLAYERS READ THE STORY TOGETHER</p>
            <p>• WHEN A CHOICE APPEARS, EACH PLAYER VOTES</p>
            <p>• THE MAJORITY VOTE DECIDES THE PATH</p>
            <p>• IF TIED, A RANDOM VOTER BREAKS THE TIE</p>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => onStartMultiplayer(players)}
          className="pixel-btn w-full bg-red-900/80 border-red-600 text-red-100 px-8 py-4 text-lg hover:bg-red-800"
        >
          ▶ CHOOSE A CONFLICT
        </button>
      </div>
    </div>
  );
}
