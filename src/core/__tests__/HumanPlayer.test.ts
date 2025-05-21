import { describe, it, expect, beforeEach } from "vitest";
import { HumanPlayer } from "../HumanPlayer";
import { ClassicPlays } from "../types/types";

describe("HumanPlayer", () => {
  let player: HumanPlayer<ClassicPlays>;

  beforeEach(() => {
  player = new HumanPlayer<ClassicPlays>();
  });
  
  describe("makePlay", () => {
    it("should update currentPlay when called", () => {
      player.makePlay("rock");
      expect(player.getCurrentPlay()).toBe("rock");
    });
  });

  describe("getCurrentPlay", () => {
    it("should return the currentPlay value", () => {
      player.makePlay("scissors");
      expect(player.getCurrentPlay()).toBe("scissors");
    });
  });

  describe("getCurrentPoints", () => {
    it("should return 0 when new HumanPlayer is created", () => {
      expect(player.getCurrentPoints()).toBe(0);
    });
  });

  describe("getCurrentPoints", () =>{
    it("should return the currentPoints value", () => {
      player.incrementCurrentPoints();
      
      expect(player.getCurrentPoints()).toBe(1);
    });
  });

  describe("incrementCurrentPoints", () => {
    it("should increment currentPoints by 1", () => {
      expect(player.getCurrentPoints()).toBe(0);
      player.incrementCurrentPoints();
      expect(player.getCurrentPoints()).toBe(1);
    });
  });

  describe("makePlay", () => {
    const validPlays = ["rock", "paper", "scissors"];

    validPlays.forEach(play => {
      it(`should accept and store the play: ${play}`, () => {
        player.makePlay(play);
        expect(player.getCurrentPlay()).toBe(play);
      })
    })
  })
});
