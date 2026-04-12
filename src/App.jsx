import { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import GameModes from './components/GameModes';
import LevelSelect from './components/LevelSelect';
import StoryScreen from './components/StoryScreen';

function App() {
  const [screen, setScreen] = useState('title');
  const [selectedLevel, setSelectedLevel] = useState(null);

  function handleSelectLevel(levelId) {
    setSelectedLevel(levelId);
    setScreen('story');
  }

  function handleNavigate(target) {
    setScreen(target);
  }

  return (
    <div className="min-h-screen bg-black">
      {screen === 'title' && <TitleScreen onNavigate={handleNavigate} />}
      {screen === 'gamemodes' && <GameModes onNavigate={handleNavigate} />}
      {screen === 'levelselect' && <LevelSelect onNavigate={handleNavigate} onSelectLevel={handleSelectLevel} />}
      {screen === 'story' && selectedLevel && <StoryScreen levelId={selectedLevel} onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
