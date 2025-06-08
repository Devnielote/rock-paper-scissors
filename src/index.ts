import { ClassicRuleset } from "./core/ClassicRuleset"
import { CpuPlayer } from "./core/CpuPlayer"
import { HumanPlayer } from "./core/HumanPlayer"
import { ClassicMatch } from "./core/ClassicMatch"
import { ClassicGameSession } from "./core/ClassicGameSession"
import { UserInterfaceManager } from "./core/UserInterfaceManager"

const player = new HumanPlayer()
const cpu = new CpuPlayer()
const classicRuleset = new ClassicRuleset()
const gameMatch = new ClassicMatch()
const userInterface = new UserInterfaceManager();
const classicGameSession = new ClassicGameSession(gameMatch, player, cpu, classicRuleset, userInterface);
classicGameSession.startGame();
