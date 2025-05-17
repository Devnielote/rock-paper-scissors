import { BigBangPlays, ClassicPlays } from "./interfaces/GameSession";
import { Player } from "./interfaces/Player";

export class HumanPlayer implements Player {
  currentPlay: ClassicPlays | BigBangPlays | null = null;
  currentPoints: number = 0;

  makePlay(play: ClassicPlays | BigBangPlays): void {
    this.currentPlay = play;
  }
  
  getCurrentPlay(){
    return this.currentPlay;
  }

  getCurrentPoints(){
    return this.currentPoints;
  }

  setCurrentPoints(){
    return this.currentPoints++;
  }
}
