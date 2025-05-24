export class PlayerMock {
  private play: string | null = null;

  getPlayerPrompt():string | null {
    return 'rock';
  }

  makePlay(play: string | null): void {
    this.play = play
  }

  getCurrentPlay(): string | null {
    return this.play;
  }

  getCurrentPoins(): number {
    return 0;
  }

  incrementCurrentPoinst(): void {}

}
