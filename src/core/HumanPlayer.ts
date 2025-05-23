import { ClassicPlays } from "./types/types";
import { Player } from "./interfaces/Player";

export class HumanPlayer<TPlays = ClassicPlays> implements Player<TPlays> {
  private currentPlay: TPlays | null = null;
  private currentPoints: number = 0;

  makePlay(play: TPlays | null): void {
    this.currentPlay = play;
  }

  getPlayerPrompt(availablePlaysList: TPlays[]): TPlays | null {
    const play = prompt(`Enter your play (${availablePlaysList.join(", ")}): `);

    if(!play) return null;

    if(availablePlaysList.includes(play as TPlays)) {
      return play as TPlays;
    } 

    return null; // Invalid input
  }
  
  getCurrentPlay(){
    return this.currentPlay;
  }

  getCurrentPoints(): number {
      return this.currentPoints;
  }

  incrementCurrentPoints(): void {
    this.currentPoints++;
  }

}
