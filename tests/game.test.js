"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const game_1 = require("../src/game");
(0, vitest_1.describe)('createBoard'), () => {
    (0, vitest_1.it)('must return a score board and game board'), () => {
        const board = (0, game_1.createBoard)();
        (0, vitest_1.expect)(board).toEqual();
    };
};
