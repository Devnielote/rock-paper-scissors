import { ClassicPlays } from "./types/types";
import { Player } from "./interfaces/Player";

export class HumanPlayer<TPlays = ClassicPlays> implements Player<TPlays> {
  private currentPlay: TPlays | null = null;
  private currentPoints: number = 0;

  makePlay(play: TPlays | null): void {
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
