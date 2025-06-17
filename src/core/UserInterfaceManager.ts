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

  cleanWinnersContainer(): void {
    const playerPlayContainer = document.getElementById('player-play')!;
    const cpuPlayContainer = document.getElementById('cpu-play')!;
    const winnerContainer = document.getElementById('winner-container')!;
    playerPlayContainer.innerHTML = "";
    cpuPlayContainer.innerHTML = "";
    winnerContainer.innerHTML = "";
  }

  cleanAfterPlaySelect(): void {
    const availablePlaysContainer = document.getElementById('plays-buttons')!;
    availablePlaysContainer.innerHTML = "";
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
      playText.innerText = `${play.toUpperCase()}`;
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
    const playsContainer = document.getElementById('plays-container');
    const buttonsContainer = document.getElementById('plays-buttons');
    if(!buttonsContainer || !playsContainer){
      throw new Error("Containers not found in DOM");
    }
    playsContainer.innerHTML = "";
    
    plays.forEach(play => {
      const buttonContainer = document.createElement('div');
      const button = document.createElement('button');

      buttonContainer.classList.add(`button_outline_${play}`);
      buttonContainer.classList.add('button_outline');

      button.style.backgroundImage = `url('../src/assets/images/icon-${play}.svg')`
      button.onclick = () => {
        if (this.userPlayResolver) {
          this.userPlayResolver(play);
          this.userPlayResolver = null;
        }
      };
      buttonContainer.append(button);
      buttonsContainer.append(buttonContainer);
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
    const buttonContainer = document.createElement('div');  
    const button = document.createElement('button');
    const text = document.createElement('p');

    text.innerText = "YOU PICKED";

    button.style.backgroundImage = `url("../../src/assets/images/icon-${play}.svg")`;
    buttonContainer.classList.add(`button_outline_${play}`);
    buttonContainer.classList.add('button_outline');

    buttonContainer.append(button);

    const userPlayElement = document.getElementById('player-play')!;
    userPlayElement.append(buttonContainer, text);
  }

  renderCpuPlay(play: ClassicPlays | BigBangPlays): void {
    const userPlayElement = document.getElementById('cpu-play')!;
    const buttonContainer = document.createElement('div');  
    const button = document.createElement('button');

    const text = document.createElement('p');
    text.innerText = "THE HOUSE PICKED";


    button.style.backgroundImage = `url("../../src/assets/images/icon-${play}.svg")`;
    buttonContainer.classList.add(`button_outline_${play}`);
    buttonContainer.classList.add('button_outline');
    buttonContainer.append(button);

    userPlayElement.append(buttonContainer,text);
  }

  renderRoundWinner(result: Player | null): void {
    const resultElement = document.getElementById('winner-container')!;
    const winner = document.createElement("p");
    const winnerName = result?.getName();
    resultElement.innerHTML = ""
    if(resultElement && result !== null){
      if (winnerName !== 'Player') {
        winner.innerText = "YOU LOSE";
      } else {
        winner.innerText = "YOU WIN";
      }
    } else {
      winner.innerText = `Tie!`;
    }
    resultElement.append(winner);
  }

  renderPlayAgainButton(onClick: () => void): void {
    const playAgainButtonContainer = document.getElementById('play-again')!;
    playAgainButtonContainer.innerHTML = "";

    const playAgainButton = document.createElement('button');
    playAgainButton.innerText = "PLAY AGAIN";

    playAgainButton.classList.add('play_again_button');
    
    playAgainButton.addEventListener('click', onClick);

    playAgainButtonContainer.append(playAgainButton);

  };
};
