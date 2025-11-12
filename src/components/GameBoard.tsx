import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GAME_DURATION_SECONDS, MOLE_INTERVAL_MS, GRID_SIZE, REWARD_POINTS, PENALTY_POINTS, BAD_BOT_CHANCE, RARE_BOT_POINTS, RARE_BOT_CHANCE } from '../constants';
import { BotType, BotVariation, ActiveBot } from '../types';
import { AIBotIcon } from './icons/AIBotIcon';
import { BadBotIcon } from './icons/BadBotIcon';
import { RareBotIcon } from './icons/RareBotIcon';
import { useSound } from '../hooks/useSound';
import { SOUNDS } from '../sounds';

interface GameBoardProps {
  endGame: (finalScore: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ endGame }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [activeBot, setActiveBot] = useState<ActiveBot | null>(null);
  const [hitEffect, setHitEffect] = useState<{ key: number, holeIndex: number, points: number } | null>(null);

  const gameLoopTimeoutRef = useRef<number>();
  const activeBotRef = useRef<ActiveBot | null>(null);
  activeBotRef.current = activeBot;
  
  const scoreRef = useRef(score);
  scoreRef.current = score;

  const playGoodBotSound = useSound(SOUNDS.GOOD_BOT);
  const playBadBotSound = useSound(SOUNDS.BAD_BOT, 0.7);
  const playRareBotSound = useSound(SOUNDS.RARE_BOT);
  const playTickSound = useSound(SOUNDS.TIMER_TICK, 0.5);

  const showNewBot = useCallback(() => {
    let newHole: number;
    do {
      newHole = Math.floor(Math.random() * GRID_SIZE);
    } while (activeBotRef.current && newHole === activeBotRef.current.hole);

    let newBot: ActiveBot;
    if (Math.random() < BAD_BOT_CHANCE) {
      newBot = { hole: newHole, type: BotType.Bad, variation: null };
    } else {
      const isRare = Math.random() < RARE_BOT_CHANCE;
      newBot = { 
        hole: newHole, 
        type: BotType.Good, 
        variation: isRare ? BotVariation.Rare : BotVariation.Standard 
      };
    }
    
    setActiveBot(newBot);

    gameLoopTimeoutRef.current = window.setTimeout(() => showNewBot(), MOLE_INTERVAL_MS);
  }, []);


  // Countdown timer for the game duration.
  useEffect(() => {
    if (timeLeft <= 0) {
      endGame(scoreRef.current);
      return;
    }

    if (timeLeft <= 5 && timeLeft > 0) {
      playTickSound();
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, endGame, playTickSound]);

  // Effect to start and stop the main game loop.
  useEffect(() => {
    showNewBot();
    return () => {
      if (gameLoopTimeoutRef.current) {
        clearTimeout(gameLoopTimeoutRef.current);
      }
    };
  }, [showNewBot]);

  const handleWhack = (holeIndex: number) => {
    if (activeBotRef.current && holeIndex === activeBotRef.current.hole) {
      const hitBot = activeBotRef.current;
      setActiveBot(null);

      if (gameLoopTimeoutRef.current) {
        clearTimeout(gameLoopTimeoutRef.current);
      }
      
      let pointsChanged = 0;
      if (hitBot.type === BotType.Good) {
        if (hitBot.variation === BotVariation.Rare) {
          pointsChanged = RARE_BOT_POINTS;
          playRareBotSound();
        } else {
          pointsChanged = REWARD_POINTS;
          playGoodBotSound();
        }
      } else {
        pointsChanged = -PENALTY_POINTS;
        playBadBotSound();
      }
      setScore(prevScore => Math.max(0, prevScore + pointsChanged));

      setHitEffect({ key: Date.now(), holeIndex, points: pointsChanged });
      
      gameLoopTimeoutRef.current = window.setTimeout(() => showNewBot(), 150);
    }
  };

  const renderBot = () => {
    if (!activeBot) return null;

    if (activeBot.type === BotType.Bad) {
      return <BadBotIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />;
    }

    if (activeBot.type === BotType.Good) {
      if (activeBot.variation === BotVariation.Rare) {
        return <RareBotIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />;
      }
      return <AIBotIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4 text-lg sm:text-xl md:text-2xl font-bold px-2">
        <div className="text-cyan-400">SCORE: <span className="text-white tabular-nums">{score}</span></div>
        <div className="text-red-500">TIME: <span className="text-white tabular-nums">{timeLeft}s</span></div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 bg-gray-800/50 rounded-md w-full max-w-md aspect-square">
        {Array.from({ length: GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className="relative w-full h-full bg-black rounded-full border-2 sm:border-4 border-gray-700 flex items-center justify-center cursor-pointer transition-all duration-100"
            onClick={() => handleWhack(index)}
          >
            {activeBot && activeBot.hole === index && (
              <div className="animate-pop-in">
                {renderBot()}
              </div>
            )}
            {hitEffect && hitEffect.holeIndex === index && (
              <div key={hitEffect.key} className="absolute inset-0 flex items-center justify-center pointer-events-none animate-score-float">
                <span
                  className={`text-3xl sm:text-4xl font-black ${
                    hitEffect.points > 0 ? 'text-yellow-300' : 'text-red-500'
                  }`}
                  style={{ textShadow: `0 0 10px ${hitEffect.points > 0 ? '#facc15' : '#ef4444'}`}}
                >
                  {hitEffect.points > 0 ? `+${hitEffect.points}` : hitEffect.points}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        .animate-pop-in {
          animation: pop-in 0.15s ease-out;
        }
        @keyframes score-float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-30px) scale(1.5); opacity: 0; }
        }
        .animate-score-float {
          animation: score-float 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameBoard;