import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <h2 className="text-4xl sm:text-5xl font-black mb-2 text-red-500" style={{ textShadow: '0 0 10px #ef4444' }}>GAME OVER</h2>
      <p className="text-xl text-gray-300 mb-4">Your final score is:</p>
      <p className="text-6xl sm:text-7xl font-black text-white mb-8 tabular-nums" style={{ textShadow: '0 0 15px #ffffff' }}>
        {score}
      </p>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-cyan-500 text-gray-900 font-black text-xl uppercase rounded-md tracking-widest
                   hover:bg-cyan-400 hover:scale-105 transform transition-all duration-200
                   shadow-[0_0_15px_rgba(34,211,238,0.5),inset_0_0_5px_rgba(255,255,255,0.3)]
                   border-2 border-cyan-300"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;