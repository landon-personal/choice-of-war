import { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import GameModes from './components/GameModes';
import LevelSelect from './components/LevelSelect';
import StoryScreen from './components/StoryScreen';
import MultiplayerLobby from './components/MultiplayerLobby';
import MultiplayerStory from './components/MultiplayerStory';

function App() {
  const [screen, setScreen] = useState('title');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gameMode, setGameMode] = useState('solo');
  const [players, setPlayers] = useState([]);

  function handleSelectLevel(levelId) {
    setSelectedLevel(levelId);
    setScreen(gameMode === 'multiplayer' ? 'multiplayer-story' : 'story');
  }

  function handleNavigate(target) {
    setScreen(target);
  }

  function handleSelectMode(mode) {
    setGameMode(mode);
    if (mode === 'multiplayer') {
      setScreen('multiplayer-lobby');
    } else {
      setScreen('levelselect');
    }
  }

  function handleStartMultiplayer(playerList) {
    setPlayers(playerList);
    setScreen('levelselect');
  }

  return (
    <div className="min-h-screen bg-black">
      {screen === 'title' && <TitleScreen onNavigate={handleNavigate} />}
      {screen === 'gamemodes' && <GameModes onNavigate={handleNavigate} onSelectMode={handleSelectMode} />}
      {screen === 'multiplayer-lobby' && <MultiplayerLobby onNavigate={handleNavigate} onStartMultiplayer={handleStartMultiplayer} />}
      {screen === 'levelselect' && <LevelSelect onNavigate={handleNavigate} onSelectLevel={handleSelectLevel} />}
      {screen === 'story' && selectedLevel && <StoryScreen levelId={selectedLevel} onNavigate={handleNavigate} />}
      {screen === 'multiplayer-story' && selectedLevel && <MultiplayerStory levelId={selectedLevel} players={players} onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
