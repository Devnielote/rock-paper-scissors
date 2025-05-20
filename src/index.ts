import { ClassicRuleset } from "./core/ClassicRuleset"
import { Cpu } from "./core/CpuPlayer"
import { ClassicGame } from "./core/Game"
import { HumanPlayer } from "./core/HumanPlayer"
import { RockPaperScissorsSession } from "./core/RockPaperScissorsSession"

const player = new HumanPlayer()
const cpu = new Cpu()
const ruleset = new ClassicRuleset()
const simpleGame = new RockPaperScissorsSession() 
const game = new ClassicGame(simpleGame,player,cpu,ruleset);
game.startGame()
