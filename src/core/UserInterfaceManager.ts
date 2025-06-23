import { Player } from "./interfaces/Player";
import { UserInterface } from "./interfaces/UserInterface";
import { BigBangMode, BigBangPlays, ClassicMode, ClassicPlays } from "./types/types";
import { delay } from "./utils/delay";

export class UserInterfaceManager implements UserInterface<string> {

  private userPlayResolver: ((play: ClassicPlays | BigBangPlays) => void) | null = null;
  private cpuPlayResolver: ((play: ClassicPlays | BigBangPlays) => void) | null = null;
  readonly gameMode: ClassicMode | BigBangMode = "classic"; 

  promptForMode(gameMode: ClassicMode | BigBangMode): void {
    gameMode = gameMode;
  }

  cleanWinnersContainer(): void {
    const availablePlaysContainer = document.getElementById('plays-container')!;
    availablePlaysContainer.classList.remove('hide');
    
    const resultsContainer = document.getElementById('results-container')!;
    //resultsContainer.classList.add('hide');

    const playerPlayContainer = document.getElementById('player-play-container')!;
    playerPlayContainer.innerHTML = "";

    const cpuPlayContainer = document.getElementById('cpu-play-container')!;
    cpuPlayContainer.innerHTML = "";

    const winnerContainer = document.getElementById('winner-container')!;
    winnerContainer.innerHTML = "";

    const footer = document.getElementById('footer')!;
    footer.style.marginTop = '0';
  }

  cleanAfterPlaySelect(): void {
    const resultsContainer = document.getElementById('results-container')!;
    resultsContainer.classList.remove('hide');

    const availablePlaysContainer = document.getElementById('plays-container')!;
    availablePlaysContainer.classList.add('hide');
    const availablePlaysButtons = document.getElementById('available-plays')!;
    availablePlaysButtons.innerHTML = "";
    const footer = document.getElementById('footer')!; 
    footer.style.marginTop = '3rem';

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
    const altPlaysContainer = document.getElementById('plays-container')!;
    const altPlays = document.getElementById('available-plays')!;

    if(!altPlaysContainer || !altPlays){
      throw new Error("Containers not found in DOM");
    }

    plays.forEach(play => {
      const buttonOutlineElement = document.createElement('div');
      const button = document.createElement('button');

      buttonOutlineElement.classList.add('button_outline');
      buttonOutlineElement.classList.add(`button_outline_${play}`);

      button.style.backgroundImage = `url('../src/assets/images/icon-${play}.svg')`
      button.onclick = () => {
        if (this.userPlayResolver) {
          this.userPlayResolver(play);
          this.userPlayResolver = null;
        }
      };
      buttonOutlineElement.append(button);
      altPlays.append(buttonOutlineElement);
    });
    altPlaysContainer.append(altPlays);
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
    buttonContainer.classList.add('button_outline');
    buttonContainer.classList.add(`button_outline_${play}`);

    buttonContainer.append(button);

    const userPlayContainer = document.getElementById('player-play-container')!;
    userPlayContainer.append(buttonContainer, text);
  }

  renderCpuPlay(play: ClassicPlays | BigBangPlays): void {
    const cpuPlayContainer = document.getElementById('cpu-play-container')!;

    const buttonContainer = document.createElement('div');  
    const button = document.createElement('button');

    const text = document.createElement('p');
    text.innerText = "THE HOUSE PICKED";


    button.style.backgroundImage = `url("../../src/assets/images/icon-${play}.svg")`;
    buttonContainer.classList.add('button_outline');
    buttonContainer.classList.add(`button_outline_${play}`);
    buttonContainer.append(button);

    cpuPlayContainer.append(buttonContainer, text)
  }

  renderRoundWinner(result: Player | null): void {
    const resultsContainer = document.getElementById('results-container')!;
    resultsContainer.classList.remove('hide');
    const winnerContainer = document.getElementById('winner-container')!;

    const resultElement = document.getElementById('winner-container')!;
    const winner = document.createElement("p");
    const winnerName = result?.getName();
    if(resultElement && result !== null){
      if (winnerName !== 'Player') {
        winner.innerText = "YOU LOSE";
      } else {
        winner.innerText = "YOU WIN";
      }
    } else {
      winner.innerText = `Tie`;
    }
    winnerContainer.append(winner);
    resultElement.append(winner);
  }

  renderPlayAgainButton(onClick: () => void): void {
    const winnerContainer = document.getElementById('winner-container')!; 

    const playAgainButtonContainer = document.createElement('div')!; 
    playAgainButtonContainer.classList.add('play_again_button');

    const playAgainButton = document.createElement('button');
    playAgainButton.innerText = "PLAY AGAIN";

    playAgainButton.addEventListener('click', onClick);
    playAgainButtonContainer.append(playAgainButton);

    winnerContainer.append(playAgainButtonContainer);
  };
};
