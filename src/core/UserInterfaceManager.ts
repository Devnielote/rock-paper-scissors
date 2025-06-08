import { UserInterface } from "./interfaces/UserInterface";
import { BigBangMode, BigBangPlays, ClassicMode, ClassicPlays } from "./types/types";

export class UserInterfaceManager implements UserInterface<string> {

  private userPlayResolver: ((play: ClassicPlays | BigBangPlays) => void) | null = null;
  private cpuPlayResolver: ((play: ClassicPlays | BigBangPlays) => void) | null = null;
  readonly gameMode: ClassicMode | BigBangMode = "classic"; 

  promptForMode(gameMode: ClassicMode | BigBangMode): void {
    gameMode = gameMode;
  }

  renderScoreboard(availablePlays: (ClassicPlays | BigBangPlays)[], playerPoints: number): void {
    const scoreboardContainer = document.getElementById('scoreboard-container')!;
    const scoreboardAvailablePlaysContainer = document.getElementById('scoreboard-plays')!;

    const scoreboardPlayerScore = document.getElementById('scoreboard-score')!;
    scoreboardPlayerScore.innerText = 'Score';

    const score = document.getElementById('score')!;
    score.innerText = `${playerPoints}`;
    scoreboardPlayerScore.append(score);

    availablePlays.forEach(play => {
      const playText = document.createElement('p');
      playText.innerText = `${play}`;
      scoreboardAvailablePlaysContainer.append(playText);
    });

    scoreboardContainer.append(scoreboardAvailablePlaysContainer, scoreboardPlayerScore);
  };

  updatePlayerScore(playerPoints: number): void {
    const scoreElement = document.getElementById('score')!;
    scoreElement.innerHTML = "";
    scoreElement.textContent = `${playerPoints}`;
  };

  renderAvailablePlays(plays: (ClassicPlays | BigBangPlays)[]): void {
    const playsListElement = document.getElementById('plays-list')!;
    const playsContainer = document.getElementById('play-buttons')!;
    playsContainer.innerHTML = "";
    plays.forEach(play => {
      const playElement = document.createElement('p');
      const button = document.createElement('button');
      playElement.innerText = play;
      button.textContent = play;
      button.onclick = () => {
        if (this.userPlayResolver) {
          this.userPlayResolver(play);
          this.userPlayResolver = null;
        }
      };
      playsListElement.appendChild(playElement);
      playsContainer.appendChild(button);
    });
  };

  
  getUserPlay(): Promise<ClassicPlays | BigBangPlays> {
    return new Promise(resolve => {
      this.userPlayResolver = resolve;
    });
  };

  getCpuPlay(): Promise<ClassicPlays | BigBangPlays> {
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
