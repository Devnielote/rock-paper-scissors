import { BigBangPlays, ClassicPlays } from "./types/types";
import { Player } from "./interfaces/Player";

export class HumanPlayer implements Player {
  currentPlay: ClassicPlays | BigBangPlays | null = null;
  currentPoints: number = 0;

  makePlay(play: ClassicPlays | BigBangPlays | null): void {
    this.currentPlay = play;
  }
  
  getCurrentPlay(){
    return this.currentPlay;
  }

  getCurrentPoints(): number {
      return this.currentPoints;
  }

  incrementCurrentPoints(): void {
    this.currentPoints++;
  }

}
