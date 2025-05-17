import { BigBangPlays, ClassicPlays } from "./GameSession";

export interface Player {
  currentPlay: ClassicPlays | BigBangPlays | null; 
  currentPoints: number;
  makePlay(play:ClassicPlays | BigBangPlays):void;
}
