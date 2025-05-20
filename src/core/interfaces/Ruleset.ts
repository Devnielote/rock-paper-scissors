import { CpuPlayer } from "./CpuPlayer";
import { BigBangMode, ClassicMode } from "../types/types"
import { Player } from "./Player";

export interface Ruleset {
  gameMode: ClassicMode | BigBangMode;

  checkRoundWinner(player: Player, cpu: CpuPlayer): void;
  declareWinner(player: Player, cpu: CpuPlayer): Player | CpuPlayer | null;
}
