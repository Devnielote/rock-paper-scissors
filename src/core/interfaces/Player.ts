import { BigBangPlays, ClassicPlays } from "../types/types";

export interface Player<TPlays = ClassicPlays | BigBangPlays> {
  getName(): string;
  makePlay(play:TPlays | null):void;
  getCurrentPlay(): TPlays | null;
  getCurrentPoints(): number;
  incrementCurrentPoints(): void;
}
