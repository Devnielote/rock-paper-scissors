import { Player } from "./interfaces/Player";
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

    const score = document.getElementById('score-points')!;
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
    const score = document.getElementById('score-points')!;
    score.innerHTML = "";
    score.innerText = `${playerPoints}`;
  };

  renderAvailablePlays(plays: (ClassicPlays | BigBangPlays)[]): void {
    const playsContainer = document.getElementById('plays-container')!;
    const buttonsContainer = document.getElementById('plays-buttons')!;
    playsContainer.innerHTML = "";
    if(!buttonsContainer || !playsContainer){
      throw new Error("Containers not found in DOM");
    }
    
    plays.forEach(play => {
      const button = document.createElement('button');
      button.innerText = `${play}`;
      button.onclick = () => {
        if (this.userPlayResolver) {
          this.userPlayResolver(play);
          this.userPlayResolver = null;
        }
      };
      buttonsContainer.append(button);
    });
    playsContainer.append(buttonsContainer);
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

  renderUserPlay(play: ClassicPlays | BigBangPlays): void {
    const userPlayElement = document.getElementById('player-play')!;
    userPlayElement.textContent = `Player play: ${play}`;
  }

  renderCpuPlay(play: ClassicPlays | BigBangPlays): void {
    const cpuPlayElement = document.getElementById('cpu-play')!;
    cpuPlayElement.textContent = `Cpy play: ${play}`;
  }

  renderRoundWinner(result: Player | null): void {
    const resultElement = document.getElementById('winner-container')!;
    const winner = document.createElement("p");
    resultElement.innerHTML = ""
    if(resultElement && result !== null){
      winner.innerText = `Winner ${result.getName()}`;
    } else {
      winner.innerText = `Tie!`;
    }
    resultElement.append(winner);
  }

  renderPlayAgainButton(onClick: () => void): void {
    const playAgainButtonContainer = document.getElementById('play-again')!;
    playAgainButtonContainer.innerHTML = "";

    const playAgainButton = document.createElement('button');
    playAgainButton.innerText = "Play Again";

    playAgainButton.classList.add('play_again_button');
    
    playAgainButton.addEventListener('click', onClick);

    playAgainButtonContainer.append(playAgainButton);

  };
};
