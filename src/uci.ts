import * as tt from './types';
import { nt, side } from 'nefs';
import { castles as actorCastles, moves as actorMoves } from './actor';

export function moveOrCastle(uciOrCastle: nt.UciOrCastles, situation: nt.Situation): nt.Maybe<tt.Move> {
  if (side.isCastles(uciOrCastle)) {
    return castle(uciOrCastle, situation);
  } else {
    return move(uciOrCastle, situation);
  }  
}

export function castle(castle: nt.CastleMeta, situation: nt.Situation): nt.Maybe<tt.Move> {
  return actorCastles(situation.board, situation.turn, castle);
}

export function move(uci: nt.Uci, situation: nt.Situation): nt.Maybe<tt.Move> {
  for (let [pos, piece] of situation.board) {
    if (piece.color === situation.turn &&
      pos === uci.orig) {
      let m = actorMoves({
        pos,
        piece,
        promotion: uci.promotion,
        board: situation.board
      }).find(m =>
        m.dest === uci.dest &&
        m.promotion === uci.promotion
      );
      if (m) {
        return m;
      }
    }
  }  
}
