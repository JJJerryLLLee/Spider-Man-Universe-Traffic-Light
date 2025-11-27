import { LightColor, WordsDatabase } from './types';

export const WORDS_DATABASE: WordsDatabase = {
  [LightColor.RED]: [
    "HALT", "FREEZE", "ERROR", "CRITICAL", "CHAOS", 
    "LOCKED", "SCREAM", "SILENCE", "VOID", "ABSOLUTE", 
    "BARRIER", "DENIED", "CRASH", "NOPE", "FORBIDDEN", 
    "RAGE", "STOP", "BLOCKED", "DEADEND", "PANIC"
  ],
  [LightColor.YELLOW]: [
    "CAUTION", "GLITCH", "LOADING", "ANXIETY", "VOLTAGE", 
    "SPARK", "HAZARD", "WAIT", "YIELD", "SLOW", 
    "BUFFER", "WARNING", "MAYBE", "ALMOST", "DOUBT", 
    "FEAR", "ACID", "PREPARE", "READY", "ATOMIC"
  ],
  [LightColor.GREEN]: [
    "GO", "VELOCITY", "IGNITE", "LAUNCH", "ZOOM", 
    "HYPER", "ALIVE", "FLOW", "ACCELERATE", "THRUST", 
    "NITRO", "ESCAPE", "RUSH", "DRIFT", "TURBO", 
    "BLAST", "SPEED", "FUTURE", "START", "BEGIN"
  ]
};

// Updated themes to be brighter, high-contrast, and more abstract
export const COLOR_THEMES = {
  [LightColor.RED]: {
    primary: 'text-spider-pink',
    secondary: 'text-spider-blue',
    // Background is now a vibrant high-key color instead of dark
    bg: 'bg-spider-blue', 
    accent: 'bg-spider-pink',
    glow: 'shadow-[0_0_80px_rgba(255,0,77,1)]'
  },
  [LightColor.YELLOW]: {
    primary: 'text-spider-yellow',
    secondary: 'text-spider-purple',
    bg: 'bg-spider-purple',
    accent: 'bg-spider-yellow',
    glow: 'shadow-[0_0_80px_rgba(255,230,0,1)]'
  },
  [LightColor.GREEN]: {
    primary: 'text-spider-green',
    secondary: 'text-spider-black',
    bg: 'bg-spider-pink',
    accent: 'bg-spider-green',
    glow: 'shadow-[0_0_80px_rgba(0,255,133,1)]'
  }
};