import React from 'react';

export const BadBotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500"
    {...props}
  >
    {/* Head shape */}
    <path d="M12 2a10 10 0 0 0-8 4 10 10 0 0 0-2 6v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a10 10 0 0 0-2-6 10 10 0 0 0-8-4z" />
    
    {/* Angry X-eyes */}
    <path d="m8.5 11.5 3 3" />
    <path d="m11.5 11.5-3 3" />
    <path d="m13.5 11.5 3 3" />
    <path d="m16.5 11.5-3 3" />
    
    {/* Broken Antenna */}
    <path d="M12 2v1.5l-1 1 2-1 -1 1" />
    
    {/* Frown */}
    <path d="M9 18c1.5-1.5 4.5-1.5 6 0" />
  </svg>
);