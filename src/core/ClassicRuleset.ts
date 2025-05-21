import { ClassicPlays } from "./types/types"
import { Ruleset } from "./interfaces/Ruleset";
import { Cpu } from "./interfaces/Cpu";
import { Player } from "./interfaces/Player";

export class ClassicRuleset implements Ruleset<ClassicPlays>  {

  checkRoundWinner(player: Player<ClassicPlays> , cpu: Cpu<ClassicPlays>): Player | Cpu | null {
    if(!player.getCurrentPlay() || !cpu.getCurrentPlay()) return null; 

   
    const winMap: Record<ClassicPlays, ClassicPlays> = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    if(player.getCurrentPlay() === cpu.getCurrentPlay()) return null //Empate 
    
    const [playerPlay, cpuPlay] = [player.getCurrentPlay(), cpu.getCurrentPlay()];

    if(playerPlay !== null && cpuPlay !== null){
      if(winMap[playerPlay] === cpuPlay) {
        player.incrementCurrentPoints();
        return player;
      } else {
        cpu.incrementCurrentPoints();
        return cpu;
      }
    }else {
      return null;
    }

  }

  declareWinner(player: Player, cpu: Cpu): Player | Cpu | null {
    const [playerP, cpuP] = [player.getCurrentPoints(), cpu.getCurrentPoints()];
    if(playerP === cpuP) return null;
    return playerP > cpuP ? player: cpu;
  }

};
