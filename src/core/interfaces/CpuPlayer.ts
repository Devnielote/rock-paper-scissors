import { BigBangPlays, ClassicPlays } from "./GameSession";
import { Player } from "./Player";

export interface CpuPlayer extends Player {
  autoPlay(availablePlays: ClassicPlays | BigBangPlays[]): void;
}
