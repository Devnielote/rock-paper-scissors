import { ClassicPlays, ClassicMode, BigBangMode } from "./types/types"
import { Ruleset } from "./interfaces/Ruleset";
import { isClassicPlay } from "./utils/isClassicTypeGuard";
import { CpuPlayer } from "./interfaces/CpuPlayer";
import { Player } from "./interfaces/Player";

export class ClassicRuleset implements Ruleset  {
  gameMode: ClassicMode;

  constructor() {
    this.gameMode = "classic";
  }

  checkRoundWinner(player: Player, cpu: CpuPlayer) {
    if(!player.currentPlay || !cpu.currentPlay) return null; 

   
    const winMap: Record<ClassicPlays, ClassicPlays> = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    if(player.currentPlay === cpu.currentPlay) return null //Empate 
      
    if(isClassicPlay(player.currentPlay) && isClassicPlay(cpu.currentPlay)){
      if (winMap[player.currentPlay] === cpu.currentPlay){
        player.incrementCurrentPoints();
      } else {
        cpu.incrementCurrentPoints();
      }
    }
  }

  declareWinner(player: Player, cpu: CpuPlayer): Player | CpuPlayer | null {
    if(!player || !cpu) return null;
    if(player.getCurrentPoints() > cpu.getCurrentPoints()) return player;
    if(player.getCurrentPoints() < cpu.getCurrentPoints()) return cpu;
    
    return null; // Empate
  }

};
