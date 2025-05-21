import { Player } from "./Player";

export interface Cpu<TPlays = any> extends Player<TPlays> {
  autoPlay(availablePlays: TPlays[]): void;
}
