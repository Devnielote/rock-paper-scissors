import { BigBangMode, ClassicMode } from "./GameSession";
import { Player } from "./Player";

export interface Ruleset {
  gameMode: ClassicMode | BigBangMode;
  roundsToWin: number;
  roundCounter: number;

  checkRoundWinner(player1: Player, player2: Player): void;
  declareSessionWinner(player1: Player, player2: Player): Player | null;
}
