import { ClassicMode, ClassicPlays, GameSession } from "./interfaces/GameSession";

export class RockPaperScissorsSession implements GameSession {
  gameMode: ClassicMode = 'classic';
  availablePlays: ClassicPlays[] = [];

  //Valid plays available 
  private modeToPlaysMap: Record<ClassicMode,ClassicPlays[]> = {
    classic: ['rock','paper','scissors']
  }

  setGameMode(mode: ClassicMode): void {
    this.gameMode = mode;
    this.setAvailablePlaysBasedOnGameMode(mode);
  }

  setAvailablePlaysBasedOnGameMode(mode: ClassicMode): void {
    this.availablePlays = this.modeToPlaysMap[mode];
  }

}
