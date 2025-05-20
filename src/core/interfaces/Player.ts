import { BigBangPlays, ClassicPlays } from "../types/types";

export interface Player {
  currentPlay: ClassicPlays | BigBangPlays | null; 
  currentPoints: number;
  makePlay(play:ClassicPlays | BigBangPlays | null):void;
  getCurrentPlay(): ClassicPlays | BigBangPlays | null;
  getCurrentPoints(): number;
  incrementCurrentPoints(): void;
}
