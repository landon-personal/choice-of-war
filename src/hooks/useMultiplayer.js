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
const PLAYER_COLORS = ['#ff4444', '#4488ff', '#44ff44', '#ffaa00'];

export function useMultiplayer() {
  const [isHost, setIsHost] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [peerId, setPeerId] = useState(null);

  const peerRef = useRef(null);
  const connectionsRef = useRef([]); // host keeps all connections
  const hostConnRef = useRef(null); // client keeps connection to host
  const gameStateRef = useRef(null); // track current game state for new joiners

  // HOST: Broadcast to all connected clients
  const broadcastToAll = useCallback((data) => {
    connectionsRef.current.forEach(conn => {
      if (conn.open) {
        conn.send(data);
      }
    });
  }, []);

  // HOST: Handle messages from clients
  const handleHostReceive = useCallback((conn, data) => {
    // Drop malformed messages from peers — peers can send anything over a
    // PeerJS data channel, including objects designed to crash the UI
    // (NaN choiceIndex, name with embedded HTML, missing peerId).
    if (!data || typeof data !== 'object' || typeof data.type !== 'string') return;
    if (data.type === 'join') {
      const safeName = typeof data.name === 'string' ? data.name.slice(0, 32) : 'PLAYER';
      const safePeerId = typeof data.peerId === 'string' && data.peerId.length < 200 ? data.peerId : null;
      if (!safePeerId) return;
      setPlayers(prev => {
        const newPlayer = {
          id: safePeerId,
          name: safeName,
          color: PLAYER_COLORS[prev.length % PLAYER_COLORS.length],
        };
        const updated = [...prev, newPlayer];
        broadcastToAll({ type: 'players', players: updated });
        // Send current game state to new joiner via ref (avoids stale closure)
        if (gameStateRef.current) {
          conn.send({ type: 'gameState', state: gameStateRef.current });
        }
        return updated;
      });
    } else if (data.type === 'vote') {
      // Validate vote payload — choiceIndex must be 0..3 (max choices in
      // any story node), playerId must be a string. A malicious peer
      // could otherwise inject garbage votes that break the tally.
      const choice = data.choiceIndex;
      if (typeof choice !== 'number' || !Number.isInteger(choice) || choice < 0 || choice > 9) return;
      if (typeof data.playerId !== 'string') return;
      setGameState(prev => {
        if (!prev) return prev;
        const newVotes = { ...prev.votes, [data.playerId]: choice };
        const updated = { ...prev, votes: newVotes };
        gameStateRef.current = updated;
        broadcastToAll({ type: 'gameState', state: updated });
        return updated;
      });
    }
  }, [broadcastToAll]);

  // CLIENT: Handle messages from host. The host is trusted in this P2P
  // model (host owns gameState authority), but a malicious / buggy host
  // could still send a malformed payload that crashes downstream renders.
  // Drop type-mismatched messages instead of letting them through.
  const handleClientReceive = useCallback((data) => {
    if (!data || typeof data !== 'object' || typeof data.type !== 'string') return;
    if (data.type === 'players') {
      if (!Array.isArray(data.players)) return;
      setPlayers(data.players);
    } else if (data.type === 'gameState') {
      if (!data.state || typeof data.state !== 'object') return;
      setGameState(data.state);
    }
  }, []);

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
    const pId = PEER_PREFIX + code;

    const peer = new Peer(pId);
    peerRef.current = peer;

    peer.on('open', () => {
      setRoomCode(code);
      setIsHost(true);
      setConnected(true);
      setConnecting(false);
      setPeerId(peer.id);
      const hostPlayer = { id: peer.id, name: playerName || 'HOST', color: PLAYER_COLORS[0] };
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
  }, [handleHostReceive, broadcastToAll]);

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
        setPeerId(peer.id);
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
  }, [handleClientReceive]);

  // HOST: Update game state and broadcast
  const updateGameState = useCallback((newState) => {
    setGameState(newState);
    gameStateRef.current = newState;
    broadcastToAll({ type: 'gameState', state: newState });
  }, [broadcastToAll]);

  // CLIENT: Send vote to host
  const sendVote = useCallback((playerId, choiceIndex) => {
    if (isHost) {
      setGameState(prev => {
        if (!prev) return prev;
        const newVotes = { ...prev.votes, [playerId]: choiceIndex };
        const updated = { ...prev, votes: newVotes };
        gameStateRef.current = updated;
        broadcastToAll({ type: 'gameState', state: updated });
        return updated;
      });
    } else if (hostConnRef.current?.open) {
      hostConnRef.current.send({ type: 'vote', playerId, choiceIndex });
    }
  }, [isHost, broadcastToAll]);

  const disconnect = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    connectionsRef.current = [];
    hostConnRef.current = null;
    gameStateRef.current = null;
    setConnected(false);
    setRoomCode('');
    setPlayers([]);
    setGameState(null);
    setIsHost(false);
    setError(null);
    setPeerId(null);
  }, []);

  return {
    isHost,
    roomCode,
    connected,
    connecting,
    error,
    players,
    gameState,
    peerId,
    createRoom,
    joinRoom,
    updateGameState,
    sendVote,
    disconnect,
  };
}
