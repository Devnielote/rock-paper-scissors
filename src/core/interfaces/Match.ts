import { ClassicMode, BigBangMode, ClassicPlays, BigBangPlays } from "../types/types";

export interface Match {
  getIsGameOver(): boolean;
  getAvailablePlays():(ClassicPlays | BigBangPlays)[]; 
  setIsGameOver(): void;
  getRoundsToWin(): number;
  setRoundsToWin(value:number): void;
  getCurrentRound():number
  incrementRoundsToWin(): void;
  checkIfSessionIsOver(): void;
}
