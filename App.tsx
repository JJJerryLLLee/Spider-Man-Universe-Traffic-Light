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
    <div className={`relative h-[100dvh] w-full flex flex-col items-center overflow-hidden transition-colors duration-500 ease-out ${theme.bg}`}>
      
      {/* --- LAYER 1: Dynamic Background Textures --- */}

      {/* 2099 Style Hexagon Grid - Rotating slowly in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 animate-spin-slow pointer-events-none mix-blend-multiply overflow-hidden gpu-accelerated">
        <svg viewBox="0 0 100 100" className="w-[150vmax] h-[150vmax] stroke-black stroke-[0.2] fill-transparent">
           <pattern id="hex" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
             <path d="M5 0 L10 2.5 L10 7.5 L5 10 L0 7.5 L0 2.5 Z" />
           </pattern>
           <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      {/* Ben-Day Dots (Halftone) - Moving */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden mix-blend-color-burn">
        <div 
          className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 bg-halftone animate-bg-pan halftone-move"
          style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 3px)' }}
        />
      </div>

      {/* Gwen-Style Watercolor Splotches */}
      <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] bg-spider-pink opacity-20 blur-[100px] rounded-full mix-blend-multiply animate-float gpu-accelerated" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-spider-blue opacity-20 blur-[80px] rounded-full mix-blend-multiply animate-float-delayed gpu-accelerated" />

      {/* --- LAYER 2: Abstract Debris & Glitches --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Prowler Claws / Glitch Lines (Earth-42) */}
        <div className="absolute top-1/4 -left-10 w-[40vw] h-2 bg-spider-purple opacity-60 rotate-12" />
        <div className="absolute top-[28%] -left-10 w-[35vw] h-1 bg-spider-green opacity-60 rotate-12" />

        {/* Triangle Shards */}
        <div className="absolute top-1/3 left-10 w-0 h-0 border-l-[50px] border-l-transparent border-t-[75px] border-t-spider-black border-r-[50px] border-r-transparent opacity-10 rotate-12 animate-float gpu-accelerated" />
        
        {/* Dashed Circle */}
        <div className="absolute bottom-1/3 right-12 w-48 h-48 border-8 border-spider-black opacity-10 border-dashed animate-float-delayed rounded-full gpu-accelerated" />
        
        {/* Random Floating Rectangles (Tech Debris) */}
        <div className="absolute top-20 right-1/4 w-12 h-12 border-2 border-spider-blue rotate-45 animate-spin-slow opacity-40 gpu-accelerated" />
        <div className="absolute bottom-40 left-1/4 w-8 h-24 bg-spider-yellow rotate-[-20deg] animate-pulse opacity-30" />

        {/* Spider-Punk Torn Paper Effect (Side Bar) */}
        <div className="absolute top-0 right-0 h-full w-24 bg-white opacity-10 torn-paper mix-blend-overlay hidden md:block" />
        <div className="absolute bottom-0 left-12 w-32 h-64 bg-black opacity-5 -rotate-6 animate-float-delayed gpu-accelerated" />
      </div>

      {/* --- LAYER 3: Comic Elements & Typography --- */}

      {/* Speed Lines */}
      <div className="absolute inset-0 speed-lines opacity-20 pointer-events-none z-0" />
      
      {/* Earth-42 Stamp */}
      <div className="absolute top-32 md:top-24 right-4 md:right-12 z-0 opacity-40 -rotate-6 mix-blend-multiply select-none pointer-events-none">
         <div className="font-marker text-4xl text-spider-purple" style={{ textShadow: '4px 4px 0 #00FF85' }}>EARTH</div>
         <div className="font-comic text-9xl text-spider-black leading-[0.7] tracking-tighter">42</div>
         <div className="w-full h-2 bg-spider-purple mt-2 animate-glitch-2"></div>
      </div>

      {/* Floating Onomatopoeia */}
      <div className="absolute bottom-32 left-8 z-0 opacity-60 rotate-12 animate-float pointer-events-none hidden md:block gpu-accelerated">
        <span className="font-comic text-6xl text-transparent stroke-black" style={{ WebkitTextStroke: '2px black' }}>BZZT!</span>
      </div>
      <div className="absolute top-1/2 right-8 z-0 opacity-30 -rotate-12 animate-pulse pointer-events-none">
        <span className="font-comic text-8xl text-spider-pink tracking-widest opacity-50">THWIP</span>
      </div>

      {/* Overlay Texture */}
      <div className="absolute inset-0 bg-halftone-light opacity-30 pointer-events-none mix-blend-overlay z-0" />
      
      {/* --- LAYER 4: Main Content --- */}

      {/* Dynamic Background Glitch Text */}
      <GlitchWord key={glitchTrigger} word={currentWord} color={lightState} />

      {/* Comic Book Frame Borders */}
      <div className="absolute inset-0 border-[16px] border-black pointer-events-none z-50 opacity-100 hidden md:block" />
      <div className="absolute top-0 left-0 w-full h-4 bg-spider-blue z-50 animate-glitch-1 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-full h-4 bg-spider-pink z-50 animate-glitch-2 opacity-50"></div>

      {/* Abstract Animated Lines (Foreground) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <line x1="-10%" y1="20%" x2="110%" y2="80%" stroke="black" strokeWidth="4" strokeDasharray="100,50" className="opacity-20 animate-pulse" />
        <line x1="-10%" y1="80%" x2="110%" y2="20%" stroke="white" strokeWidth="8" className="opacity-30 mix-blend-overlay" />
      </svg>
      
      {/* Header */}
      <div className="w-full h-20 relative z-40 flex items-center justify-between px-8 md:px-12 pt-8">
        <div className="font-comic text-4xl text-black drop-shadow-[3px_3px_0_#FFF] -rotate-2 hover:scale-110 transition-transform cursor-default">
          <span className="bg-spider-yellow px-2 border-2 border-black shadow-[4px_4px_0_#000]">SPIDER</span>
          <span className="bg-spider-blue px-2 border-2 border-black ml-2 text-white shadow-[4px_4px_0_#000]">SIGNALS</span>
        </div>
      </div>

      {/* Main Traffic Light Component */}
      <div className="relative flex-grow flex justify-center items-center pb-20 scale-90 md:scale-100">
        <TrafficLight currentColor={lightState} onToggle={handleToggle} />
      </div>

      {/* Footer / Comic Caption */}
      <div className="absolute bottom-12 md:bottom-16 bg-white border-4 border-black p-4 z-40 shadow-[8px_8px_0px_#000] -rotate-1 max-w-md mx-4 animate-float-delayed gpu-accelerated">
        <div className="absolute -top-3 -left-3 w-4 h-4 bg-spider-pink border-2 border-black"></div>
        <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-spider-green border-2 border-black"></div>
        <p className="font-marker text-lg md:text-xl text-black leading-tight text-center">
          TAP THE LIGHT! <span className="text-spider-pink">GLITCH</span> THE MULTIVERSE!
        </p>
      </div>

      {/* Film Grain & Noise Overlay for Texture */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-25 mix-blend-multiply gpu-accelerated" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default App;