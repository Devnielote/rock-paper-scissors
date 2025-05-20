import { ClassicMode, BigBangMode, ClassicPlays, BigBangPlays } from "../types/types";

export interface GameSession {
  gameMode: ClassicMode | BigBangMode;
  availablePlays: ClassicPlays[] | BigBangPlays[];
  roundsToWin: number;
  currentRound: number;
  isGameOver: boolean;

  setGameMode(gameMode: ClassicMode | BigBangMode): void;
  setAvailablePlaysBasedOnGameMode(gameMode: ClassicMode | BigBangMode): void;
  setIsGameOver(): void;
  getRoundsToWin(): number;
  setRoundsToWin(value:number): void;
  getCurrentRound():number
  incrementRoundsToWin(): void;
  checkIfSessionIsOver(): void;
}
