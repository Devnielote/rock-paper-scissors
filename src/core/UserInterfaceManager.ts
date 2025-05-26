import { UserInterface } from "./interfaces/UserInterface";
import { BigBangMode, ClassicMode } from "./types/types";

export class UserInterfaceManager implements UserInterface<string> {

  private userPlayResolver: ((play: string) => void) | null = null;
  private cpuPlayResolver: ((play: string) => void) | null = null;
  readonly gameMode: ClassicMode | BigBangMode = "classic"; 

  promptForRounds(): number {
    let rounds: number;
    do {
      rounds = Number(prompt("How many rounds to win?: "));
    } while  (rounds <= 0);
    return rounds;
  };

  promptForMode(gameMode: ClassicMode | BigBangMode): void {
    gameMode = gameMode;
  }

  renderPlayerScore(playerPoints: number): void {
    const scoreElement = document.getElementById('scoreboard')!;
    scoreElement.textContent = `Score ${playerPoints}`;
  }

  updatePlayerScore(playerPoints: number): void {
    const scoreElement = document.getElementById('scoreboard')!;
    scoreElement.innerHTML = "";
    scoreElement.textContent = `Score ${playerPoints}`;
  }

  renderAvailablePlays(plays: string[]): void {
    const container = document.getElementById('play-buttons')!;
    container.innerHTML = "";
    plays.forEach(play => {
      const button = document.createElement('button');
      button.textContent = play;
      button.onclick = () => {
        if (this.userPlayResolver) {
          this.userPlayResolver(play);
          this.userPlayResolver = null;
        }
      };
      container.appendChild(button);
    });
  };

  
  getUserPlay(): Promise<string> {
    return new Promise(resolve => {
      this.userPlayResolver = resolve;
    });
  };

  getCpuPlay(): Promise<string> {
    return new Promise(resolve => {
      this.cpuPlayResolver = resolve;
    })
  }

  renderUserPlay(play: string): void {
    const userPlayElement = document.getElementById('player-play')!;
    userPlayElement.textContent = `Player play: ${play}`;
  }

  renderCpuPlay(play: string): void {
    const cpuPlayElement = document.getElementById('cpu.play')!;
    cpuPlayElement.textContent = `Cpy play: ${play}`;
  }

  renderRoundWinner(result: string): void {
    const resultElement = document.getElementById('winner-container')!;
    if (resultElement) resultElement.textContent = `Winner! ${result}`;
  }

};
