import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { LightColor } from '../types';
import { COLOR_THEMES } from '../constants';

interface TrafficLightProps {
  currentColor: LightColor;
  onToggle: () => void;
}

const TrafficLight: React.FC<TrafficLightProps> = ({ currentColor, onToggle }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const theme = COLOR_THEMES[currentColor];

  const handleClick = () => {
    // Aggressive shake animation
    controls.start({
      rotate: [0, -15, 12, -8, 5, -3, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
      transition: { duration: 0.8, ease: "backOut" }
    });
    onToggle();
  };

  const lightVariants = {
    off: { opacity: 0.3, scale: 0.9 },
    on: (color: string) => ({
      opacity: 1,
      scale: 1.15,
      backgroundColor: color,
      boxShadow: `0 0 60px 20px ${color}, inset 0 0 20px rgba(255,255,255,0.8)`,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    })
  };

  return (
    <div className="relative z-20 flex flex-col items-center select-none perspective-1000">
      
      {/* The Wire System - Heavy Black Lines */}
      <div className="absolute top-0 w-full h-48 pointer-events-none -translate-y-[90%]">
         <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             {/* Main Wire - Thick and Black */}
            <path 
              d="M -200 -80 Q 50% 150 200% -80" 
              fill="none" 
              stroke="black" 
              strokeWidth="8"
              className="drop-shadow-xl"
            />
            {/* Highlight on wire */}
            <path 
              d="M -200 -84 Q 50% 146 200% -84" 
              fill="none" 
              stroke="#444" 
              strokeWidth="2"
            />
         </svg>
      </div>

      {/* Hanging Chain/Cable */}
      <motion.div 
        className="w-4 h-32 bg-black border-x-2 border-zinc-800 origin-top z-10"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 5px, #333 5px, #333 10px)'}}
        animate={controls}
      />

      {/* The Light Box - BRIGHT ORANGE and CHUNKY */}
      <motion.div
        className="relative w-48 h-[28rem] bg-spider-orange rounded-2xl p-4 cursor-pointer z-20"
        animate={controls}
        onClick={handleClick}
        whileHover={{ scale: 1.05, rotate: 2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          border: '8px solid black',
          boxShadow: '20px 20px 0px rgba(0,0,0,1)', // Hard comic shadow
          transformOrigin: 'top center'
        }}
      >
        {/* Halftone Texture on the Box */}
        <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none rounded-lg" />
        
        {/* Decorative Industrial Elements */}
        <div className="absolute -top-4 -left-4 w-6 h-6 bg-spider-yellow border-4 border-black rounded-full z-30" />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-spider-yellow border-4 border-black rounded-full z-30" />
        
        {/* Graffiti / Stickers */}
        <div className="absolute -right-12 bottom-20 rotate-[-10deg] font-marker text-spider-blue text-4xl stroke-black bg-black px-2 z-40">
          <span className="text-spider-blue" style={{ textShadow: '4px 4px 0 #FF0055' }}>DANGER</span>
        </div>
        
        <div className="absolute -left-8 top-12 rotate-[5deg] w-16 h-16 bg-spider-pink border-4 border-black rounded-full flex items-center justify-center z-40">
          <span className="font-comic font-bold text-black text-2xl">42</span>
        </div>

        {/* Lights Container */}
        <div className="flex flex-col justify-between h-full bg-black rounded-xl p-3 border-4 border-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
          
          {/* Red Light */}
          <div className="relative w-full aspect-square rounded-full border-[6px] border-zinc-900 bg-zinc-950 overflow-hidden flex items-center justify-center">
             <motion.div 
               className="w-full h-full rounded-full"
               variants={lightVariants}
               custom="#FF004D"
               animate={currentColor === LightColor.RED ? 'on' : 'off'}
             />
             {/* Honeycomb pattern overlay */}
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] pointer-events-none mix-blend-overlay" />
          </div>

          {/* Yellow Light */}
          <div className="relative w-full aspect-square rounded-full border-[6px] border-zinc-900 bg-zinc-950 overflow-hidden flex items-center justify-center">
            <motion.div 
               className="w-full h-full rounded-full"
               variants={lightVariants}
               custom="#FFE600"
               animate={currentColor === LightColor.YELLOW ? 'on' : 'off'}
             />
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] pointer-events-none mix-blend-overlay" />
          </div>

          {/* Green Light */}
          <div className="relative w-full aspect-square rounded-full border-[6px] border-zinc-900 bg-zinc-950 overflow-hidden flex items-center justify-center">
             <motion.div 
               className="w-full h-full rounded-full"
               variants={lightVariants}
               custom="#00FF85"
               animate={currentColor === LightColor.GREEN ? 'on' : 'off'}
             />
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] pointer-events-none mix-blend-overlay" />
          </div>

        </div>

        {/* Reflection Highlight */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-10 skew-x-[-10deg] pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default TrafficLight;