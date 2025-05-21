import { Cpu } from "./Cpu";
import {  BigBangPlays , ClassicPlays } from "../types/types"
import { Player } from "./Player";

export interface Ruleset<TPlays = ClassicPlays | BigBangPlays> {
  checkRoundWinner(player: Player<TPlays>, cpu: Cpu<TPlays>): Player | Cpu | null;
  declareWinner(player: Player<TPlays>, cpu: Cpu<TPlays>): Player | Cpu | null;
}
