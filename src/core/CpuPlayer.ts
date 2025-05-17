import { CpuPlayer } from "./interfaces/CpuPlayer";
import { ClassicPlays, BigBangPlays } from "./interfaces/GameSession";

export class Cpu implements CpuPlayer {
  currentPlay: ClassicPlays | BigBangPlays | null = null;
  currentPoints: number = 0;

  makePlay(play: ClassicPlays | BigBangPlays): void {
      this.currentPlay = play;
  }

  autoPlay(availablePlays: (ClassicPlays | BigBangPlays)[]): void {
    const random: number = Math.floor(Math.random() * availablePlays.length);
    this.makePlay(availablePlays[random]);
  }
}
