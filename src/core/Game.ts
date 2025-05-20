import { CpuPlayer } from "./interfaces/CpuPlayer";
import { Game } from "./interfaces/Game";
import { GameSession } from "./interfaces/GameSession";
import { Player } from "./interfaces/Player";
import { Ruleset } from "./interfaces/Ruleset";
import { BigBangMode, ClassicMode } from "./types/types";
import { isClassicPlay } from "./utils/isClassicTypeGuard";

export class ClassicGame implements Game{
  gameMode: ClassicMode | BigBangMode;
  gameSession: GameSession;
  player: Player;
  cpu: CpuPlayer;
  ruleset: Ruleset;

  constructor(gameSession: GameSession, player:Player, cpu: CpuPlayer, ruleset: Ruleset){
    this.gameMode = "classic";
    this.gameSession = gameSession;
    this.player = player;
    this.cpu = cpu;
    this.ruleset = ruleset;
  }

  startGame(): void {
    let promptUserForTotalRounds: number;

    do {
      promptUserForTotalRounds = Number(prompt("How many rounds to win?: "));

    } while (!promptUserForTotalRounds || promptUserForTotalRounds !>= 1);

    this.gameSession.setRoundsToWin(promptUserForTotalRounds);
    
    while (!this.gameSession.isGameOver){
      this.gameSession.checkIfSessionIsOver();
      const availablePlays = this.gameSession.availablePlays;
      // Player turn
      const playerPlay = prompt(`Enter your play (${availablePlays}): `);

      if(playerPlay && isClassicPlay(playerPlay)){
        this.player.makePlay(playerPlay);
      }

      if(!playerPlay){
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

  endGame(): void {
      
  }
}
