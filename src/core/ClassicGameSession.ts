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

  startGame(): void {
    while (!this.gameMatch.getIsGameOver()){
      this.gameMatch.checkIfSessionIsOver();

      const availablePlays = this.gameMatch.getAvailablePlays();
      this.userInterface.renderPlayerScore();
      this.userInterface.renderAvailablePlays(availablePlays);

      // Player turn
      const playerPlay = this.player.getPlayerPrompt(availablePlays);
      this.player.makePlay(playerPlay);

      if(!playerPlay || playerPlay == null){
        // If no valid play, break loop and ask again 
        console.log("Please, enter a valid play")
        break
      }
      
      //Cpu turn 
      this.cpu.autoPlay(availablePlays);

      //Check winner of current round and increment current points of the winner

      const currentRoundWinner = this.ruleset.checkRoundWinner(this.player, this.cpu);
      console.log("This round winner is: " + currentRoundWinner)

    }

    const winner = this.ruleset.declareWinner(this.player, this.cpu)
    console.log(winner)
  }
}
