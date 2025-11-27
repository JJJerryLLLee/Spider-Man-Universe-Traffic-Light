import React, { useState, useEffect, useCallback } from 'react';
import { LightColor } from './types';
import { WORDS_DATABASE, COLOR_THEMES } from './constants';
import TrafficLight from './components/TrafficLight';
import GlitchWord from './components/GlitchWord';

const App: React.FC = () => {
  const [lightState, setLightState] = useState<LightColor>(LightColor.RED);
  const [currentWord, setCurrentWord] = useState<string>("STOP");
  const [glitchTrigger, setGlitchTrigger] = useState<number>(0);
  const theme = COLOR_THEMES[lightState];

  const getRandomWord = useCallback((color: LightColor, current: string) => {
    const list = WORDS_DATABASE[color];
    let newWord = list[Math.floor(Math.random() * list.length)];
    while (newWord === current && list.length > 1) {
      newWord = list[Math.floor(Math.random() * list.length)];
    }
    return newWord;
  }, []);

  useEffect(() => {
    const word = getRandomWord(LightColor.RED, "");
    setCurrentWord(word);
  }, [getRandomWord]);

  const handleToggle = () => {
    setLightState((prev) => {
      let nextColor: LightColor;
      switch (prev) {
        case LightColor.RED: nextColor = LightColor.GREEN; break;
        case LightColor.GREEN: nextColor = LightColor.YELLOW; break;
        case LightColor.YELLOW: nextColor = LightColor.RED; break;
        default: nextColor = LightColor.RED;
      }
      
      const nextWord = getRandomWord(nextColor, currentWord);
      setCurrentWord(nextWord);
      setGlitchTrigger(n => n + 1);
      return nextColor;
    });
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center overflow-hidden transition-colors duration-500 ease-out ${theme.bg}`}>
      
      {/* --- Dynamic Background Layers --- */}

      {/* 1. Moving Halftone Spots (The Ben-Day Dots) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden mix-blend-multiply">
        <div 
          className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 bg-halftone animate-bg-pan halftone-move"
          style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)' }}
        />
      </div>

      {/* 2. Abstract Geometric Debris (Floating Elements) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Triangle Left */}
        <div className="absolute top-1/4 left-10 w-0 h-0 border-l-[50px] border-l-transparent border-t-[75px] border-t-spider-black border-r-[50px] border-r-transparent opacity-10 rotate-12 animate-float" />
        {/* Circle Right */}
        <div className="absolute bottom-1/3 right-12 w-32 h-32 border-4 border-black rounded-full opacity-10 border-dashed animate-float-delayed" />
        {/* Striped Box Bottom Left */}
        <div className="absolute bottom-20 -left-10 w-64 h-24 bg-black opacity-5 -rotate-12 animate-float-delayed" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 12px)' }}
        />
         {/* Lightning/Crackle Top Right */}
         <svg className="absolute top-20 right-20 w-48 h-48 opacity-20 animate-pulse" viewBox="0 0 100 100">
            <path d="M20,20 L50,50 L30,60 L80,90" fill="none" stroke="black" strokeWidth="2" />
         </svg>
      </div>

      {/* 3. Static Speed Lines */}
      <div className="absolute inset-0 speed-lines opacity-20 pointer-events-none z-0" />
      
      {/* 4. Color Overlay Texture */}
      <div className="absolute inset-0 bg-halftone-light opacity-30 pointer-events-none mix-blend-overlay z-0" />
      
      {/* --- Main Content --- */}

      {/* Dynamic Background Glitch Text (Behind Traffic Light) */}
      <GlitchWord key={glitchTrigger} word={currentWord} color={lightState} />

      {/* Comic Book Frame Borders */}
      <div className="absolute inset-0 border-[20px] border-black pointer-events-none z-50 opacity-100 hidden md:block" />

      {/* Abstract Animated Lines (Foreground) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <line x1="-10%" y1="20%" x2="110%" y2="80%" stroke="black" strokeWidth="4" strokeDasharray="100,50" className="opacity-20 animate-pulse" />
        <line x1="-10%" y1="80%" x2="110%" y2="20%" stroke="white" strokeWidth="8" className="opacity-30 mix-blend-overlay" />
      </svg>
      
      {/* Header */}
      <div className="w-full h-20 relative z-40 flex items-center justify-between px-8 md:px-12 pt-8">
        <div className="font-comic text-4xl text-black drop-shadow-[2px_2px_0_#FFF] -rotate-2">
          <span className="bg-spider-yellow px-2 border-2 border-black">SPIDER</span>
          <span className="bg-spider-blue px-2 border-2 border-black ml-1 text-white">SIGNALS</span>
        </div>
      </div>

      {/* Main Traffic Light Component */}
      <div className="relative flex-grow flex justify-center items-center pb-20 scale-90 md:scale-100">
        <TrafficLight currentColor={lightState} onToggle={handleToggle} />
      </div>

      {/* Footer / Comic Caption */}
      <div className="absolute bottom-12 md:bottom-16 bg-white border-4 border-black p-4 z-40 shadow-[8px_8px_0px_#000] rotate-1 max-w-md mx-4">
        <p className="font-marker text-lg md:text-xl text-black leading-tight text-center">
          TAP THE LIGHT! BREAK THE CANON!
        </p>
      </div>

      {/* Film Grain & Noise Overlay for Texture */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-20 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default App;