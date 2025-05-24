export class CpuMock {
  autoPlay(availablePlays: string []): void {
  }

  getCurrentPlay(): string | null {
    return 'scissors';
  }

  getCurrentPoints(): number {
    return 0;
  }

  incrementCurrentPoints(): void {};
}
