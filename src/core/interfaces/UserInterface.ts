import { BigBangMode, BigBangPlays, ClassicMode, ClassicPlays } from "../types/types";
import { Cpu } from "./Cpu";
import { Player } from "./Player";

export interface UserInterface<TPlay = ClassicPlays | BigBangPlays> {
  promptForMode(gameMode: ClassicMode | BigBangMode): void;
  renderAvailablePlays(plays: TPlay[]): void;
  renderScoreboard(availablePlays: TPlay[],playerPoints: number): void;
  updatePlayerScore(playerPoints: number): void;
  getUserPlay(): Promise<TPlay>;
  getCpuPlay(): Promise<TPlay>;
  renderRulesButton(): void;
  renderUserPlay(play: TPlay): void;
  renderCpuPlay(play: TPlay): void;
  renderRoundWinner(result: Player | Cpu | null): void;
  renderPlayAgainButton(onClick: () => void):void;
  renderRulesButton(onClick: () => void): void;
  cleanWinnersContainer(): void;
  cleanAfterPlaySelect():void;
}
