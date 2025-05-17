export type ClassicPlays = 'rock'|'paper'|'scissors';
export type BigBangPlays = 'rock'|'paper'|'scissors'|'lizard'|'spock';
export type ClassicMode = 'classic'
export type BigBangMode = 'big bang'

export interface GameSession {
  gameMode: ClassicMode | BigBangMode;
  availablePlays: ClassicPlays[] | BigBangPlays[];

  setGameMode(mode: ClassicMode | BigBangMode): void;
  setAvailablePlaysBasedOnGameMode(mode:ClassicMode | BigBangMode): void;
}
