import { GameSession } from "./interfaces/GameSession"
import { Cpu } from "./interfaces/Cpu";
import { Match } from "./interfaces/Match";
import { Player } from "./interfaces/Player";
import { Ruleset } from "./interfaces/Ruleset";
import { UserInterface } from "./interfaces/UserInterface";

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

  async startGame(): Promise<void> {
    while (!this.gameMatch.getIsGameOver()){
      this.gameMatch.checkIfSessionIsOver();

      const availablePlays = this.gameMatch.getAvailablePlays();
      const playerScore = this.player.getCurrentPoints();
      this.userInterface.renderScoreboard(availablePlays,playerScore);
      this.userInterface.renderAvailablePlays(availablePlays);

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
      console.log("This round winner is: " + currentRoundWinner)
    }

    const winner = this.ruleset.declareWinner(this.player, this.cpu)
    console.log(winner)
  }
}
