import {  ClassicPlays } from "../types/types";

export function isClassicPlay(play: any): play is ClassicPlays {
  return play === 'rock' || play === 'paper' || play === 'scissors';
}
