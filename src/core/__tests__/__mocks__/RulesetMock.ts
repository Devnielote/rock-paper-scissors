export class RulesetMock {
  checkRoundWinner(player: any, cpu: any): string {
    return 'player';
  }

  declareWinner(player: any, cpu: any): string {
    return 'Player wins!'
  }
}
