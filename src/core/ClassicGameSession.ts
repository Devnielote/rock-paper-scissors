import { GameSession } from "./interfaces/GameSession"
import { Cpu } from "./interfaces/Cpu";
import { Match } from "./interfaces/Match";
import { Player } from "./interfaces/Player";
import { Ruleset } from "./interfaces/Ruleset";
import { UserInterface } from "./interfaces/UserInterface";
import { delay } from "./utils/delay";

export class ClassicGameSession implements GameSession{
  private gameMatch: Match;
  private player: Player;
  private cpu: Cpu;
  private ruleset: Ruleset;
  private userInterface: UserInterface;
  // Prompt inyectable temporalmente para los tests
  readonly getPrompt: (message:string) => string | null = prompt; 

  constructor(gameMatch: Match, player:Player, cpu: Cpu, ruleset: Ruleset, userInterface: UserInterface){
    this.gameMatch = gameMatch;
    this.player = player;
    this.cpu = cpu;
    this.ruleset = ruleset;
    this.userInterface = userInterface;
  }

  startGame(): void {
    const availablePlays = this.gameMatch.getAvailablePlays();

    const handlePlayerPlay = async () => {
      this.userInterface.cleanWinnersContainer();
      this.userInterface.renderAvailablePlays(availablePlays);
      // Player turn
      const playerPlay = await this.userInterface.getUserPlay();
      this.player.makePlay(playerPlay);
      this.userInterface.renderUserPlay(playerPlay);

      this.userInterface.cleanAfterPlaySelect();

      // Cpu turn 
      await delay(1300)
      this.cpu.autoPlay(availablePlays);
      const cpuPlay = this.cpu.getCurrentPlay();
      this.userInterface.renderCpuPlay(cpuPlay);

      //After play selection 

      //Check winner of current round and increment winner points 
      const currentRoundWinner = this.ruleset.checkRoundWinner(this.player, this.cpu);
      await delay(600);
      this.userInterface.renderRoundWinner(currentRoundWinner);
      if(currentRoundWinner?.getName() == "Player") {
        this.userInterface.updatePlayerScore(this.player.getCurrentPoints());
      }

      await delay(1000);
      this.userInterface.renderPlayAgainButton(() => {
        handlePlayerPlay();
        const playAgainButtonContainer = document.getElementById("play-again")!;
        playAgainButtonContainer.innerHTML = "";
      });
    }

    let playerScore = this.player.getCurrentPoints();
    this.userInterface.renderScoreboard(availablePlays,playerScore);
    handlePlayerPlay(); 
  }
}
