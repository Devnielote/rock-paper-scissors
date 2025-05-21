import { Cpu } from "./interfaces/Cpu";
import { ClassicPlays } from "./types/types";

export class CpuPlayer<TPlay = ClassicPlays> implements Cpu<TPlay> {
  private currentPlay: TPlay | null = null;
  private currentPoints: number = 0;

  getCurrentPlay(): TPlay | null {
      return this.currentPlay;
  }

  makePlay(play: TPlay): void {
      this.currentPlay = play;
  }

  autoPlay(availablePlays: TPlay[]): void {
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
