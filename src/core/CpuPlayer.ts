import { Cpu } from "./interfaces/Cpu";
import { BigBangPlays, ClassicPlays } from "./types/types";

export class CpuPlayer<TPlay = ClassicPlays | BigBangPlays> implements Cpu<TPlay> {
  private currentPlay: TPlay | null = null;
  private currentPoints: number = 0;
  private name: string = "Cpu";

  getName(): string {
    return this.name;
  }

  getCurrentPlay(): TPlay | null {
      return this.currentPlay;
  }

  getPlayerPrompt(availablePlay: TPlay[]): TPlay | null {
    return null;
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
