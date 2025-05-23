import { BigBangPlays, ClassicPlays } from "../types/types";

export interface Player<TPlays = ClassicPlays | BigBangPlays> {
  makePlay(play:TPlays | null):void;
  getPlayerPrompt(availablePlay: TPlays[]): TPlays | null;
  getCurrentPlay(): TPlays | null;
  getCurrentPoints(): number;
  incrementCurrentPoints(): void;
}
