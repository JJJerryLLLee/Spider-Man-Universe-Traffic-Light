import React, { useMemo } from 'react';
import { LightColor } from '../types';
import { COLOR_THEMES } from '../constants';

interface GlitchWordProps {
  word: string;
  color: LightColor;
}

const GlitchWord: React.FC<GlitchWordProps> = ({ word, color }) => {
  const theme = COLOR_THEMES[color];
  
  // Exaggerated random rotation and scale
  const transformStyle = useMemo(() => {
    const rotate = Math.random() * 30 - 15; // -15deg to 15deg
    const scale = 1.2 + Math.random() * 0.4;
    return { transform: `rotate(${rotate}deg) scale(${scale})` };
  }, [word]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
      <div className="relative w-full text-center" style={transformStyle}>
        
        {/* Layer 1: Solid Black Drop Shadow (Hard Comic Style) */}
        <h1 
          className="absolute top-0 left-0 w-full text-[25vw] md:text-[35vw] font-comic leading-none text-black opacity-100"
          style={{ transform: 'translate(20px, 20px)' }}
        >
          {word}
        </h1>

        {/* Layer 2: The Echo (Secondary Color) */}
        <h1 
          className={`absolute top-0 left-0 w-full text-[25vw] md:text-[35vw] font-comic leading-none ${theme.secondary} opacity-80 mix-blend-hard-light animate-glitch-2 select-none`}
          style={{ transform: 'translate(-15px, -10px)' }}
        >
          {word}
        </h1>

        {/* Layer 3: Main Text with Outline */}
        <h1 
          className={`relative text-[25vw] md:text-[35vw] font-comic leading-none ${theme.primary} select-none drop-shadow-2xl z-10`}
          style={{ 
            WebkitTextStroke: '4px black',
            textShadow: '10px 10px 0px rgba(0,0,0,0.2)'
          }}
        >
          {word}
          
          {/* Internal Glitch Slice */}
          <span 
             className="absolute inset-0 text-white mix-blend-overlay animate-glitch-1" 
             style={{ clipPath: 'inset(40% 0 40% 0)' }}
          >
            {word}
          </span>
        </h1>
      </div>
      
      {/* Background Abstract Halftone Shapes */}
      <div className="absolute inset-0 z-[-1] opacity-40">
        <svg width="100%" height="100%">
           <defs>
             <pattern id="comic-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
               <circle cx="15" cy="15" r="8" fill="rgba(0,0,0,0.2)" />
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#comic-dots)" />
        </svg>
      </div>
    </div>
  );
};

export default GlitchWord;