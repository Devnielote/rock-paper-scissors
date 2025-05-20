import { GameSession } from "./interfaces/GameSession";
import { BigBangMode, ClassicMode, ClassicPlays } from "./types/types";

export class RockPaperScissorsSession implements GameSession {
  gameMode: ClassicMode = 'classic';
  availablePlays: ClassicPlays[] = [];
  isGameOver: boolean = false;
  roundsToWin: number = 0;
  currentRound: number = 0;

  //Valid plays available 
  private modeToPlaysMap: Record<ClassicMode,ClassicPlays[]> = {
    classic: ['rock','paper','scissors']
  }

  setGameMode(mode: ClassicMode): void {
    this.gameMode = mode;
    this.setAvailablePlaysBasedOnGameMode(mode);
  }

  setRoundsToWin(value: number): void {
     this.roundsToWin = value; 
  }

  setAvailablePlaysBasedOnGameMode(mode: ClassicMode): void {
    this.availablePlays = this.modeToPlaysMap[mode];
  }

  setIsGameOver(): void {
    !this.isGameOver ? this.isGameOver = true: false;
  }

  incrementRoundsToWin(): void {
    this.roundsToWin++
  }

  getRoundsToWin(): number {
    return this.roundsToWin;
  }
  
  getCurrentRound(): number {
    return this.currentRound;
  }

  checkIfSessionIsOver(): void | null{
    if(this.getCurrentRound() >= this.getRoundsToWin()){
      this.setIsGameOver();
    }
    else {
      return null;
    }
  }

}

