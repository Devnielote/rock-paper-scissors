import { ClassicPlays, ClassicMode, BigBangMode } from "./interfaces/GameSession";
import { Player } from "./interfaces/Player";
import { Ruleset } from "./interfaces/Ruleset";
import { isClassicPlay } from "./utils/isClassicTypeGuard";

export class ClassicRuleset implements Ruleset  {
  gameMode: ClassicMode | BigBangMode;
  roundsToWin: number;
  roundCounter: number = 0;

  constructor(gameMode: ClassicMode | BigBangMode, roundsToWin:number) {
    this.gameMode = gameMode;
    this.roundsToWin = roundsToWin;
  }

  checkRoundWinner(player1: Player, player2: Player) {
    if(this.roundCounter >= this.roundsToWin) return null;
    if(!player1.currentPlay || !player2.currentPlay) return null; 

    this.roundCounter++

    if(this.gameMode == 'classic'){
      const winMap: Record<ClassicPlays, ClassicPlays> = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
      };

      if(player1.currentPlay === player2.currentPlay) return null //Empate 
        
      if(isClassicPlay(player1.currentPlay) && isClassicPlay(player2.currentPlay)){
        if (winMap[player1.currentPlay] === player2.currentPlay){
          player1.currentPoints++
        } else {
          player2.currentPoints++
        }
      }
    }
  };

  declareSessionWinner(player1: Player, player2: Player): Player | null {
    if(!player1 || !player2) return null;

    if(player1.currentPoints > player2.currentPoints) return player1;
    if(player1.currentPoints < player2.currentPoints) return player2;
    
    return null;
  }
}
