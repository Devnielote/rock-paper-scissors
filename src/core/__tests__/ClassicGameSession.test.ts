import { describe, it, expect, beforeEach } from "vitest";
import { HumanPlayer } from "../HumanPlayer";
import { ClassicPlays } from "../types/types";
import { ClassicRuleset } from "../ClassicRuleset";
import { ClassicMatch } from "../ClassicMatch";
import { ClassicGameSession } from "../ClassicGameSession";
import { CpuPlayer } from "../CpuPlayer";

describe("ClassicGameSession", () => {
  let player: HumanPlayer<ClassicPlays>;
  let cpu: CpuPlayer<ClassicPlays>;
  let classicRuleset: ClassicRuleset;
  let gameMatch: ClassicMatch;
  let classicGameSession: ClassicGameSession;

  beforeEach(() => {
  player = new HumanPlayer<ClassicPlays>();
  cpu = new CpuPlayer<ClassicPlays>();
  classicRuleset = new ClassicRuleset();
  gameMatch = new ClassicMatch();
  classicGameSession = new ClassicGameSession();

 
  })
})
