import { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import GameModes from './components/GameModes';
import LevelSelect from './components/LevelSelect';
import StoryScreen from './components/StoryScreen';
import MultiplayerLobby from './components/MultiplayerLobby';
import MultiplayerStory from './components/MultiplayerStory';
import { useMultiplayer } from './hooks/useMultiplayer';

function App() {
  const [screen, setScreen] = useState('title');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gameMode, setGameMode] = useState('solo');
  const multiplayer = useMultiplayer();

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

  return (
    <div className="min-h-[100dvh] bg-black">
      {screen === 'title' && <TitleScreen onNavigate={handleNavigate} />}
      {screen === 'gamemodes' && <GameModes onNavigate={handleNavigate} onSelectMode={handleSelectMode} />}
      {screen === 'multiplayer-lobby' && <MultiplayerLobby onNavigate={handleNavigate} multiplayer={multiplayer} />}
      {screen === 'levelselect' && <LevelSelect onNavigate={handleNavigate} onSelectLevel={handleSelectLevel} />}
      {screen === 'story' && selectedLevel && <StoryScreen levelId={selectedLevel} onNavigate={handleNavigate} />}
      {screen === 'multiplayer-story' && selectedLevel && <MultiplayerStory levelId={selectedLevel} multiplayer={multiplayer} onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
