import { describe, it, expect, beforeEach } from "vitest";
import { ClassicRuleset } from "../ClassicRuleset";
import { ClassicPlays } from "../types/types";
import { Ruleset } from "../interfaces/Ruleset";
import { HumanPlayer } from "../HumanPlayer";
import { CpuPlayer } from "../CpuPlayer";

describe("ClassicRuleset", () => {
  let classicRuleset: Ruleset; 
  let player: HumanPlayer;
  let cpu: CpuPlayer;

  beforeEach(() => {
    classicRuleset = new ClassicRuleset();
    player = new HumanPlayer();
    cpu = new CpuPlayer();
  });

  describe("checkRoundWinner", () => {
    it("should return the round winner based on each player and cpu plays", () => {
      player.makePlay("rock");
      cpu.autoPlay()
      classicRuleset.checkRoundWinner()
    })
  })
})
