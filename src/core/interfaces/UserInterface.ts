import { BigBangMode, BigBangPlays, ClassicMode, ClassicPlays } from "../types/types";
import { Player } from "./Player";

export interface UserInterface<TPlay = ClassicPlays | BigBangPlays> {
  promptForRounds(): number;
  promptForMode(gameMode: ClassicMode | BigBangMode): void;
  renderAvailablePlays(plays: TPlay[]): void;
  renderPlayerScore(playerPoints: number): void;
  updatePlayerScore(playerPoints: number): void;
  getUserPlay(): Promise<TPlay>;
  getCpuPlay(): Promise<TPlay>;
  renderUserPlay(play: string): void;
  renderCpuPlay(play: string): void;
  renderRoundWinner(result: string): void;
}
