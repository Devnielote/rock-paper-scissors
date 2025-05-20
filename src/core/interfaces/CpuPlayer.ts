import { BigBangPlays, ClassicPlays } from "../types/types";
import { Player } from "./Player";

export interface CpuPlayer extends Player {
  autoPlay(availablePlays: ClassicPlays | BigBangPlays[]): void;
}
