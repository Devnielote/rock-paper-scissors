import { Player } from "./interfaces/Player";
import { UserInterface } from "./interfaces/UserInterface";
import { BigBangMode, BigBangPlays, ClassicMode, ClassicPlays } from "./types/types";

import rockImg from '../assets/images/icon-rock.svg';
import paperImg from '../assets/images/icon-paper.svg';
import scissorsImg from '../assets/images/icon-scissors.svg';
import rulesImg from '../assets/images/image-rules.svg';
import closeImg from '../assets/images/icon-close.svg';

const playIcons: Record<string, string> = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

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
      const buttonImg = document.createElement('img');

      buttonOutlineElement.classList.add('button_outline');
      buttonOutlineElement.classList.add(`button_outline_${play}`);

      buttonImg.src = `${playIcons[play]}`;
      button.append(buttonImg);

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
    const buttonImg = document.createElement('img');
    const text = document.createElement('p');

    buttonImg.src = `${playIcons[play]}`;
    button.append(buttonImg);

    text.innerText = "YOU PICKED";

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
    const buttonImg = document.createElement('img');

    const text = document.createElement('p');
    text.innerText = "THE HOUSE PICKED";

    buttonImg.src = `${playIcons[play]}`;
    button.append(buttonImg);


    button.style.backgroundImage = `url(${playIcons[play]})`;
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

  renderRulesButton(): void {
    const button = document.createElement('button');
    button.innerText = 'RULES'
    const footer = document.getElementById('footer')!;
    footer.append(button);

    button.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.id = 'rules-overlay';
      overlay.classList.add('rules_overlay');

      const modal = document.createElement('div');
      modal.id = 'rules-modal';
      modal.classList.add('rules_modal');
      modal.style.backgroundImage = `url(${rulesImg})`;

      const text = document.createElement('p');
      text.innerText = "RULES";

      const closeBtn = document.createElement('div');
      const closeImgBtn = document.createElement('img');
      closeImgBtn.src = `${closeImg}`;

      closeBtn.id = 'close-rules';
      closeBtn.classList.add('close_rules')

      closeBtn.append(closeImgBtn);
      modal.append(closeBtn,text);

      overlay.append(modal);
      document.body.append(overlay);

      document.getElementById('close-rules')!.addEventListener('click', () => {
        document.body.removeChild(overlay);;
      })
    });
  }
};
