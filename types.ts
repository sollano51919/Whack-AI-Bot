
export enum GameState {
  Start = 'START',
  Playing = 'PLAYING',
  GameOver = 'GAME_OVER',
}

export interface HighScore {
  name: string;
  score: number;
}

export enum BotType {
  Good = 'GOOD',
  Bad = 'BAD',
}

export enum BotVariation {
  Standard = 'STANDARD',
  Rare = 'RARE',
}

export interface ActiveBot {
  hole: number;
  type: BotType;
  variation: BotVariation | null;
}
