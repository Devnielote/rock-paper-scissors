import { BigBangPlays, ClassicPlays } from "../interfaces/GameSession";

export function isClassicPlay(play: ClassicPlays | BigBangPlays | null): play is ClassicPlays {
  return play === 'rock' || play === 'paper' || play === 'scissors';
}
