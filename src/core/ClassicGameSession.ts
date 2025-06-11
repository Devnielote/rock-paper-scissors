import { GameSession } from "./interfaces/GameSession"
import { Cpu } from "./interfaces/Cpu";
import { Match } from "./interfaces/Match";
import { Player } from "./interfaces/Player";
import { Ruleset } from "./interfaces/Ruleset";
import { UserInterface } from "./interfaces/UserInterface";
import { UserInterfaceManager } from "./UserInterfaceManager";

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

    const handlePlayerPlay  = async () => {
      // Player turn
      const playerPlay = await this.userInterface.getUserPlay();
      this.player.makePlay(playerPlay);
      this.userInterface.renderUserPlay(playerPlay);

      // Cpu turn 
      this.cpu.autoPlay(availablePlays);
      const cpuPlay = this.cpu.getCurrentPlay();
      this.userInterface.renderCpuPlay(cpuPlay);

      //Check winner of current round and increment winner points 
      const currentRoundWinner = this.ruleset.checkRoundWinner(this.player, this.cpu);
      this.userInterface.renderRoundWinner(currentRoundWinner);
      if(currentRoundWinner?.getName() == "Player") {
        this.userInterface.updatePlayerScore(this.player.getCurrentPoints());
      } 
      handlePlayerPlay();
    }
    let playerScore = this.player.getCurrentPoints();
    this.userInterface.renderScoreboard(availablePlays,playerScore);
    this.userInterface.renderAvailablePlays(availablePlays);
    handlePlayerPlay(); 
  }
}
