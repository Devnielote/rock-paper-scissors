import { describe, it, expect, vi } from 'vitest';
import { ClassicGameSession } from "../ClassicGameSession";

const createMockMatch = () => {
  setRoundsToWin: vi.fn(),
  getIsGameOver: vi.fn().mockReturnValueOnce(false).mockReturnValueOnce(true),
  checkIfSessionIsOver: vi.fn(),
  getAvailablePlays: vi.fn().mockReturnValue(['rock','paper','scissors']),
});
