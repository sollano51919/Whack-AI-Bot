import React from 'react';
import { HighScore } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';

interface LeaderboardProps {
  scores: HighScore[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  return (
    <aside className="w-full bg-black/30 border-2 border-cyan-500 rounded-lg p-4 md:p-6 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
      <h2 className="text-2xl sm:text-3xl font-black text-center mb-4 sm:mb-6 text-cyan-400 flex items-center justify-center gap-2">
        <TrophyIcon className="w-8 h-8 text-yellow-400" />
        Leaderboard
      </h2>
      {scores.length > 0 ? (
        <ol className="space-y-2">
          {scores.map((score, index) => (
            <li
              key={`${score.name}-${score.score}-${index}`}
              className={`flex justify-between items-center p-2 sm:p-3 rounded-md text-base sm:text-lg font-bold ${
                index === 0 ? 'bg-yellow-400/20 text-yellow-300 border-l-4 border-yellow-400' :
                index === 1 ? 'bg-gray-400/20 text-gray-300 border-l-4 border-gray-400' :
                index === 2 ? 'bg-orange-600/20 text-orange-400 border-l-4 border-orange-500' :
                'bg-gray-700/30 text-cyan-300'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                <span className="font-black text-lg sm:text-xl w-6 text-center">{index + 1}.</span>
                <span className="truncate uppercase">{score.name}</span>
              </div>
              <span className="tabular-nums ml-4">{score.score.toLocaleString()} PTS</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center text-gray-400">No scores yet. Be the first!</p>
      )}
    </aside>
  );
};

export default Leaderboard;