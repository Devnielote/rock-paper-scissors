import { RockPaperScissorsSession } from "./RockPaperScissorsSession";

export class Game{
  gameSession: RockPaperScissorsSession;

  constructor(gameSession: RockPaperScissorsSession){
    this.gameSession = gameSession;
  }
}
