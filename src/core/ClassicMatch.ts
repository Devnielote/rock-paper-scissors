import { Match } from "./interfaces/Match";
import { BigBangPlays, ClassicMode, ClassicPlays } from "./types/types";

export class ClassicMatch implements Match {
  private availablePlays: ClassicPlays[] = ['paper','scissors','rock'];
  private isGameOver: boolean = false;
  private roundsToWin: number = 0;
  private currentRound: number = 0;

  setRoundsToWin(value: number): void {
     this.roundsToWin = value; 
  }

  setIsGameOver(): void {
    this.isGameOver = true;
  }

  incrementRoundsToWin(): void {
    this.roundsToWin++
  }

  getIsGameOver(): boolean {
      return this.isGameOver;
  }

  getRoundsToWin(): number {
    return this.roundsToWin;
  }
  
  getCurrentRound(): number {
    return this.currentRound;
  }

  getAvailablePlays(): (ClassicPlays | BigBangPlays)[] {
      return this.availablePlays;
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

