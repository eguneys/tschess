import * as nt from './types';
import * as f from './fen';
import * as uci from './uci';
import * as tsuci from './tsuci';
import * as m from './move';


export const fenAfterUcis = (fen: string, moves: Array<string>) =>{
  let situation = moves
    .map(uci.str2uci)
    .reduce((situation, move) => {
      if (move && situation) {
        let _move = tsuci.moveOrCastle(move, situation);
        if (_move) {
          return m.situationAfter(_move);
        }
      }
    }, f.situation(fen === 'startpos' ? nt.initialFen : fen));

  if (situation) {
    return f.fen(situation);
  }
}
