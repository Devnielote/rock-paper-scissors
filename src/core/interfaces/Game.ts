import { ClassicMode, BigBangMode } from "../types/types"
import { CpuPlayer } from "./CpuPlayer";
import { GameSession } from "./GameSession";
import { Player } from "./Player";
import { Ruleset } from "./Ruleset";

export interface Game {
  gameMode: ClassicMode | BigBangMode;
  gameSession: GameSession;
  ruleset: Ruleset;
  player: Player;
  cpu: CpuPlayer;

  startGame():void;
  endGame():void;
}
