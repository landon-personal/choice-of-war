import { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';

// Generate a short room code
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

const PEER_PREFIX = 'cow-game-'; // choice of war prefix

export function useMultiplayer() {
  const [isHost, setIsHost] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState(null);

  const peerRef = useRef(null);
  const connectionsRef = useRef([]); // host keeps all connections
  const hostConnRef = useRef(null); // client keeps connection to host

  const playerColors = ['#ff4444', '#4488ff', '#44ff44', '#ffaa00'];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  // HOST: Create a room
  const createRoom = useCallback((playerName) => {
    setConnecting(true);
    setError(null);
    const code = generateRoomCode();
    const peerId = PEER_PREFIX + code;

    const peer = new Peer(peerId);
    peerRef.current = peer;

    peer.on('open', () => {
      setRoomCode(code);
      setIsHost(true);
      setConnected(true);
      setConnecting(false);
      const hostPlayer = { id: peer.id, name: playerName || 'HOST', color: playerColors[0] };
      setPlayers([hostPlayer]);
    });

    peer.on('connection', (conn) => {
      conn.on('open', () => {
        conn.on('data', (data) => {
          handleHostReceive(conn, data);
        });

        conn.on('close', () => {
          connectionsRef.current = connectionsRef.current.filter(c => c !== conn);
          setPlayers(prev => {
            const updated = prev.filter(p => p.id !== conn.peer);
            broadcastToAll({ type: 'players', players: updated });
            return updated;
          });
        });

        connectionsRef.current.push(conn);
      });
    });

    peer.on('error', (err) => {
      setError('Failed to create room. Try again.');
      setConnecting(false);
      console.error('PeerJS error:', err);
    });
  }, []);

  // CLIENT: Join a room
  const joinRoom = useCallback((code, playerName) => {
    setConnecting(true);
    setError(null);
    const cleanCode = code.toUpperCase().trim();

    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', () => {
      const conn = peer.connect(PEER_PREFIX + cleanCode);
      hostConnRef.current = conn;

      conn.on('open', () => {
        setRoomCode(cleanCode);
        setIsHost(false);
        setConnected(true);
        setConnecting(false);
        // Tell host our name
        conn.send({ type: 'join', name: playerName || 'PLAYER', peerId: peer.id });
      });

      conn.on('data', (data) => {
        handleClientReceive(data);
      });

      conn.on('close', () => {
        setConnected(false);
        setError('Disconnected from host.');
      });

      conn.on('error', () => {
        setError('Could not connect to room.');
        setConnecting(false);
      });
    });

    peer.on('error', (err) => {
      if (err.type === 'peer-unavailable') {
        setError('Room not found. Check the code.');
      } else {
        setError('Connection error. Try again.');
      }
      setConnecting(false);
      console.error('PeerJS error:', err);
    });
  }, []);

  // HOST: Handle messages from clients
  function handleHostReceive(conn, data) {
    if (data.type === 'join') {
      setPlayers(prev => {
        const newPlayer = {
          id: data.peerId,
          name: data.name,
          color: playerColors[prev.length % playerColors.length],
        };
        const updated = [...prev, newPlayer];
        // Send full player list to ALL clients
        broadcastToAll({ type: 'players', players: updated });
        // Send current game state to the new player
        if (gameState) {
          conn.send({ type: 'gameState', state: gameState });
        }
        return updated;
      });
    } else if (data.type === 'vote') {
      // Forward vote to game state handler
      setGameState(prev => {
        if (!prev) return prev;
        const newVotes = { ...prev.votes, [data.playerId]: data.choiceIndex };
        const updated = { ...prev, votes: newVotes };
        broadcastToAll({ type: 'gameState', state: updated });
        return updated;
      });
    }
  }

  // CLIENT: Handle messages from host
  function handleClientReceive(data) {
    if (data.type === 'players') {
      setPlayers(data.players);
    } else if (data.type === 'gameState') {
      setGameState(data.state);
    }
  }

  // HOST: Broadcast to all connected clients
  function broadcastToAll(data) {
    connectionsRef.current.forEach(conn => {
      if (conn.open) {
        conn.send(data);
      }
    });
  }

  // HOST: Update game state and broadcast
  const updateGameState = useCallback((newState) => {
    setGameState(newState);
    broadcastToAll({ type: 'gameState', state: newState });
  }, []);

  // CLIENT: Send vote to host
  const sendVote = useCallback((playerId, choiceIndex) => {
    if (isHost) {
      // Host votes locally
      setGameState(prev => {
        if (!prev) return prev;
        const newVotes = { ...prev.votes, [playerId]: choiceIndex };
        const updated = { ...prev, votes: newVotes };
        broadcastToAll({ type: 'gameState', state: updated });
        return updated;
      });
    } else if (hostConnRef.current?.open) {
      hostConnRef.current.send({ type: 'vote', playerId, choiceIndex });
    }
  }, [isHost]);

  const disconnect = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    connectionsRef.current = [];
    hostConnRef.current = null;
    setConnected(false);
    setRoomCode('');
    setPlayers([]);
    setGameState(null);
    setIsHost(false);
    setError(null);
  }, []);

  return {
    isHost,
    roomCode,
    connected,
    connecting,
    error,
    players,
    gameState,
    createRoom,
    joinRoom,
    updateGameState,
    sendVote,
    disconnect,
  };
}
