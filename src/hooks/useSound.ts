import { useCallback, useEffect, useRef } from 'react';

export const useSound = (soundSrc: string, volume: number = 1.0) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio(soundSrc);
      audio.preload = 'auto';
      audio.volume = volume;
      audioRef.current = audio;
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }, [soundSrc, volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        // Autoplay was prevented by browser policies, this is common.
        // We can log it but it's not a critical application error.
        console.log(`Sound play prevented for ${soundSrc}:`, error);
      });
    }
  }, [soundSrc]);

  return play;
};