import { IBoard } from  './core/types.ts'

export class Game {
  private board: GameBoard 
  private ruleSet: RuleSet
  private player1: Player 
  private player2: Player

  constructor(board: GameBoardm, ruleSet: RuleSet, player1: Player, player2: Player ){
    this.board =  board,
    this.ruleSet = ruleSet,
    this.player1 = player1,
    this.player2 = player2
  }

  startGame(): void {

  }
}
