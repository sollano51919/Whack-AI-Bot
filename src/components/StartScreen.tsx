import React, { useState, useEffect } from 'react';
import { AIBotIcon } from './icons/AIBotIcon';

interface StartScreenProps {
  onStart: (name: string) => void;
  initialUsername: string;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, initialUsername }) => {
  const [name, setName] = useState(initialUsername);

  useEffect(() => {
    setName(initialUsername);
  }, [initialUsername]);

  const handleStart = () => {
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <AIBotIcon className="w-24 h-24 mb-4 text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]" />
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ready to Test Your Reflexes?</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Whack the <span className="text-cyan-400 font-bold">cyan bots</span> for 1 point.
        Look out for <span className="text-yellow-400 font-bold">rare golden bots</span> worth 5 points!
        Avoid the <span className="text-red-500 font-bold">red bots</span> or you'll lose points.
      </p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ENTER YOUR NAME"
        maxLength={12}
        className="w-full max-w-xs px-4 py-3 mb-6 bg-gray-900 border-2 border-cyan-500 rounded-md text-center text-lg sm:text-xl font-bold tracking-widest text-white
                   placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent uppercase"
      />

      <button
        onClick={handleStart}
        disabled={!name.trim()}
        className="px-8 py-4 bg-cyan-500 text-gray-900 font-black text-lg sm:text-xl uppercase rounded-md tracking-widest
                   hover:bg-cyan-400 hover:scale-105 transform transition-all duration-200
                   shadow-[0_0_15px_rgba(34,211,238,0.5),inset_0_0_5px_rgba(255,255,255,0.3)]
                   border-2 border-cyan-300
                   disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;