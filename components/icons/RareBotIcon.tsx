
import React from 'react';

export const RareBotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-400"
    {...props}
  >
    {/* Head shape */}
    <path d="M12 2a10 10 0 0 0-8 4 10 10 0 0 0-2 6v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a10 10 0 0 0-2-6 10 10 0 0 0-8-4z" />
    
    {/* Eyes */}
    <circle cx="9.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
    
    {/* Antenna */}
    <path d="M12 2V4" />
    <path d="M12 4.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" fill="currentColor" stroke="none" />

    {/* Smile */}
    <path d="M9 17c1.5 1 4.5 1 6 0" />

    {/* Star on forehead */}
    <path d="M12 8.5l-0.47 0.97 -1.07 0.15 0.77 0.75 -0.18 1.06 L12 11l0.95 0.5 -0.18 -1.06 0.77 -0.75 -1.07 -0.15z" fill="currentColor" stroke="none" />
  </svg>
);
