import React, { useState, useEffect, useCallback } from 'react';
import { GameState, HighScore } from './types';
import { LEADERBOARD_KEY, MAX_LEADERBOARD_ENTRIES, USERNAME_KEY } from './constants';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import { useSound } from './hooks/useSound';
import { SOUNDS } from './sounds';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [username, setUsername] = useState('');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [lastScore, setLastScore] = useState<number | null>(null);

  const playStartSound = useSound(SOUNDS.GAME_START, 0.7);
  const playGameOverSound = useSound(SOUNDS.GAME_OVER);

  useEffect(() => {
    try {
      const storedScores = localStorage.getItem(LEADERBOARD_KEY);
      if (storedScores) {
        setHighScores(JSON.parse(storedScores));
      }
      const storedUsername = localStorage.getItem(USERNAME_KEY);
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      setHighScores([]);
    }
  }, []);

  const updateLeaderboard = useCallback((newScore: number) => {
    if (!username) return;
    try {
      const newEntry: HighScore = { name: username, score: newScore };
      const newHighScores = [...highScores, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_LEADERBOARD_ENTRIES);
      setHighScores(newHighScores);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newHighScores));
    } catch (error) {
       console.error("Failed to save high scores to localStorage:", error);
    }
  }, [highScores, username]);

  const startGame = (name: string) => {
    const formattedName = name.trim().toUpperCase();
    setUsername(formattedName);
    try {
      localStorage.setItem(USERNAME_KEY, formattedName);
    } catch (error) {
      console.error("Failed to save username to localStorage", error);
    }
    playStartSound();
    setLastScore(null);
    setGameState(GameState.Playing);
  };

  const endGame = useCallback((finalScore: number) => {
    setLastScore(finalScore);
    updateLeaderboard(finalScore);
    playGameOverSound();
    setGameState(GameState.GameOver);
  }, [updateLeaderboard, playGameOverSound]);

  const renderGameState = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={startGame} initialUsername={username} />;
      case GameState.Playing:
        return <GameBoard endGame={endGame} />;
      case GameState.GameOver:
        return <GameOverScreen score={lastScore ?? 0} onRestart={() => setGameState(GameState.Start)} />;
      default:
        return <StartScreen onStart={startGame} initialUsername={username} />;
    }
  };
  
  const handleRestart = () => {
    // Go back to start screen without resetting username
    setGameState(GameState.Start);
  };


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 selection:bg-cyan-500 selection:text-gray-900">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        <div className="w-full md:w-2/3">
          <header className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest text-cyan-400" style={{ textShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee' }}>
              Whack-an-AI-Bot
            </h1>
          </header>
          <main className="w-full bg-black/30 border-2 border-cyan-500 rounded-lg p-4 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
             {gameState === GameState.GameOver 
              ? <GameOverScreen score={lastScore ?? 0} onRestart={handleRestart} />
              : renderGameState()
            }
          </main>
        </div>
        <div className="w-full md:w-1/3">
          <Leaderboard scores={highScores} />
        </div>
      </div>
      <footer className="text-center text-gray-500 mt-8 text-sm">
        <p>Built with React, Tailwind CSS, and a bit of futuristic fun.</p>
      </footer>
    </div>
  );
};

export default App;