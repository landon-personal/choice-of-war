import { useState } from 'react';

export default function MultiplayerLobby({ onNavigate, multiplayer }) {
  const { isHost, roomCode, connected, connecting, error, players, createRoom, joinRoom, disconnect } = multiplayer;
  const [playerName, setPlayerName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [mode, setMode] = useState(null); // null, 'create', 'join'

  function handleCreate() {
    createRoom(playerName || 'HOST');
  }

  function handleJoin() {
    if (joinCode.length < 3) return;
    joinRoom(joinCode, playerName || 'PLAYER');
  }

  function handleStartGame() {
    onNavigate('levelselect');
  }

  // Connected — show lobby
  if (connected) {
    return (
      <div className="scanlines min-h-[100dvh] bg-black flex flex-col items-center justify-center p-4 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />
        <div className="relative z-10 w-full max-w-lg">
          <button onClick={() => { disconnect(); setMode(null); }} className="pixel-text text-red-700 text-[10px] md:text-sm mb-4 md:mb-8 hover:text-red-500 cursor-pointer">
            LEAVE ROOM
          </button>

          <h2 className="pixel-text text-lg md:text-3xl text-red-500 glow-red mb-1 text-center">
            WAR ROOM
          </h2>

          {/* Room code display */}
          <div className="text-center mb-6 md:mb-8">
            <div className="pixel-text text-[8px] md:text-xs text-gray-500 mb-2">ROOM CODE</div>
            <div className="pixel-text text-2xl md:text-5xl text-amber-400 glow-amber tracking-[8px] md:tracking-[16px] select-all">
              {roomCode}
            </div>
            <div className="pixel-text text-[7px] md:text-[10px] text-gray-600 mt-2">
              SHARE THIS CODE WITH FRIENDS
            </div>
          </div>

          {/* Players list */}
          <div className="mb-6 md:mb-8">
            <div className="pixel-text text-[8px] md:text-xs text-red-600 mb-3">
              SOLDIERS ({players.length}/4)
            </div>
            <div className="flex flex-col gap-2">
              {players.map((player, i) => (
                <div
                  key={player.id}
                  className="flex items-center gap-3 bg-gray-950/60 border px-3 md:px-5 py-2 md:py-3"
                  style={{ borderColor: player.color }}
                >
                  <div className="w-3 h-3 rotate-45 shrink-0" style={{ backgroundColor: player.color }} />
                  <span className="pixel-text text-[9px] md:text-sm flex-1" style={{ color: player.color }}>
                    {player.name}
                  </span>
                  {i === 0 && (
                    <span className="pixel-text text-[7px] md:text-[9px] text-yellow-600 border border-yellow-800/50 px-1.5 py-0.5">
                      HOST
                    </span>
                  )}
                </div>
              ))}
            </div>
            {players.length < 2 && (
              <div className="pixel-text text-[7px] md:text-[9px] text-gray-600 mt-3 text-center blink">
                WAITING FOR PLAYERS...
              </div>
            )}
          </div>

          {/* Start game button — host only, 2+ players */}
          {isHost && players.length >= 2 && (
            <button
              onClick={handleStartGame}
              className="pixel-btn w-full bg-red-900/80 border-red-600 text-red-100 px-6 py-3 md:py-4 text-[10px] md:text-sm hover:bg-red-800 fade-in"
            >
              START GAME
            </button>
          )}
          {isHost && players.length < 2 && (
            <div className="pixel-text text-[7px] md:text-[9px] text-gray-700 text-center">
              NEED AT LEAST 2 PLAYERS TO START
            </div>
          )}
          {!isHost && (
            <div className="pixel-text text-[8px] md:text-[10px] text-gray-500 text-center">
              WAITING FOR HOST TO START...
            </div>
          )}
        </div>
      </div>
    );
  }

  // Not connected — create or join
  return (
    <div className="scanlines min-h-[100dvh] bg-black flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />

      <div className="relative z-10 w-full max-w-lg">
        <button
          onClick={() => { if (mode) setMode(null); else onNavigate('gamemodes'); }}
          className="pixel-text text-red-700 text-[10px] md:text-sm mb-4 md:mb-8 hover:text-red-500 cursor-pointer"
        >
          BACK
        </button>

        <h2 className="pixel-text text-lg md:text-3xl text-red-500 glow-red mb-1 text-center">
          MULTIPLAYER
        </h2>
        <p className="pixel-text text-[7px] md:text-xs text-gray-500 text-center mb-1">
          ONLINE CO-OP
        </p>
        <div className="w-16 md:w-32 h-0.5 md:h-1 bg-red-800 mx-auto mb-6 md:mb-10" />

        {error && (
          <div className="border border-red-800 bg-red-950/40 px-4 py-2 mb-4 pixel-text text-[8px] md:text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        {!mode && (
          <div className="flex flex-col gap-3">
            {/* Name input */}
            <div className="mb-2">
              <div className="pixel-text text-[8px] md:text-xs text-gray-500 mb-2">YOUR NAME</div>
              <input
                className="pixel-text text-[10px] md:text-sm w-full bg-gray-950/60 border-2 border-gray-700 text-white px-4 py-3 outline-none uppercase focus:border-red-700"
                placeholder="ENTER NAME..."
                value={playerName}
                maxLength={16}
                onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
              />
            </div>

            <button
              onClick={() => setMode('create')}
              className="pixel-btn w-full bg-red-950/60 border-red-700 text-red-100 px-6 py-4 md:py-5 text-[10px] md:text-sm hover:bg-red-900/80"
            >
              CREATE ROOM
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="h-px flex-1 bg-gray-800" />
              <span className="pixel-text text-[8px] text-gray-600">OR</span>
              <div className="h-px flex-1 bg-gray-800" />
            </div>

            <button
              onClick={() => setMode('join')}
              className="pixel-btn w-full bg-gray-950/40 border-gray-700 text-gray-300 px-6 py-4 md:py-5 text-[10px] md:text-sm hover:bg-gray-900/60 hover:border-gray-500"
            >
              JOIN ROOM
            </button>
          </div>
        )}

        {mode === 'create' && (
          <div className="fade-in">
            <div className="pixel-text text-[8px] md:text-xs text-gray-500 mb-2">YOUR NAME</div>
            <input
              className="pixel-text text-[10px] md:text-sm w-full bg-gray-950/60 border-2 border-gray-700 text-white px-4 py-3 outline-none uppercase focus:border-red-700 mb-4"
              placeholder="ENTER NAME..."
              value={playerName}
              maxLength={16}
              onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
            />
            <button
              onClick={handleCreate}
              disabled={connecting}
              className="pixel-btn w-full bg-red-900/80 border-red-600 text-red-100 px-6 py-3 md:py-4 text-[10px] md:text-sm hover:bg-red-800 disabled:opacity-50"
            >
              {connecting ? 'CREATING...' : 'CREATE ROOM'}
            </button>
          </div>
        )}

        {mode === 'join' && (
          <div className="fade-in">
            <div className="pixel-text text-[8px] md:text-xs text-gray-500 mb-2">YOUR NAME</div>
            <input
              className="pixel-text text-[10px] md:text-sm w-full bg-gray-950/60 border-2 border-gray-700 text-white px-4 py-3 outline-none uppercase focus:border-red-700 mb-4"
              placeholder="ENTER NAME..."
              value={playerName}
              maxLength={16}
              onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
            />
            <div className="pixel-text text-[8px] md:text-xs text-gray-500 mb-2">ROOM CODE</div>
            <input
              className="pixel-text text-lg md:text-2xl w-full bg-gray-950/60 border-2 border-gray-700 text-amber-400 px-4 py-3 outline-none uppercase focus:border-amber-700 text-center tracking-[6px] mb-4"
              placeholder="XXXXX"
              value={joinCode}
              maxLength={5}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            />
            <button
              onClick={handleJoin}
              disabled={connecting || joinCode.length < 3}
              className="pixel-btn w-full bg-red-900/80 border-red-600 text-red-100 px-6 py-3 md:py-4 text-[10px] md:text-sm hover:bg-red-800 disabled:opacity-50"
            >
              {connecting ? 'CONNECTING...' : 'JOIN ROOM'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
