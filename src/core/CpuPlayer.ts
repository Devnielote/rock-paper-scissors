import { CpuPlayer } from "./interfaces/CpuPlayer";
import { ClassicPlays, BigBangPlays } from "./types/types";

export class Cpu implements CpuPlayer {
  currentPlay: ClassicPlays | BigBangPlays | null = null;
  currentPoints: number = 0;

  getCurrentPlay(): ClassicPlays | BigBangPlays | null {
      return this.currentPlay;
  }

  makePlay(play: ClassicPlays | BigBangPlays): void {
      this.currentPlay = play;
  }

  autoPlay(availablePlays: (ClassicPlays | BigBangPlays)[]): void {
    const random: number = Math.floor(Math.random() * availablePlays.length);
    this.makePlay(availablePlays[random]);
  }

  getCurrentPoints(): number {
      return this.currentPoints;
  }

  incrementCurrentPoints(): void {
      this.currentPoints++
  }
}
