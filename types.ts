export enum LightColor {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

export interface WordConfig {
  text: string;
  style: 'glitch' | 'clean' | 'outline' | 'neon';
}

export type WordsDatabase = Record<LightColor, string[]>;
