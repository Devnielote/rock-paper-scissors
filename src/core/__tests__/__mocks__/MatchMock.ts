export class MatchMock {
  private roundsToWin = 0;
  private currentRounds = 0;
  private isGameOver = false;

  setRoundsToWin(rounds: number): void {
    this.roundsToWin = rounds;
  };

  getCurrentRounds(): number {
    return this.currentRounds;
  };
  
  getIsGameOver(): boolean {
    return this.isGameOver;
  };

  getAvailablePlays(): string[]{
    return ['rock','paper','scissors'];
  }

  checkIfSessionIsOver(): void {
    if(this.getCurrentRounds() >= this.roundsToWin){
      this.isGameOver = true;
    }
  }
}
