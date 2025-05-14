import { describe, it, expect } from 'vitest'
import { createBoard } from '../src/game'

describe('createBoard'), () => {
  it('must return a score board and game board'), () => {
    const board = createBoard()
    expect(board).toEqual()
  }
}
