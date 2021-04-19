import * as tt from './types2';
import * as nt from './types';
import * as side from './side';
import { castles as actorCastles, moves as actorMoves } from './actor';

export function moveOrCastle(sanOrCastle: nt.SanMetaOrCastles, situation: nt.Situation): nt.Maybe<tt.Move> {
  if (side.isCastles(sanOrCastle)) {
    return castle(sanOrCastle, situation);
  } else {
    return move(sanOrCastle, situation);
  }
}

export function castle(castle: nt.CastleMeta, situation: nt.Situation): nt.Maybe<tt.Move> {
  return actorCastles(situation.board, situation.turn, castle);
}

export function move(san: nt.SanMeta, situation: nt.Situation): nt.Maybe<tt.Move> {
  for (let [pos, piece] of situation.board) {
    if (piece.color === situation.turn &&
      piece.role === san.role &&
      (pos[0] === san.file || pos[0]) &&
      (pos[1] === san.rank || pos[1])) {
      let m = actorMoves({
        pos,
        piece,
        promotion: san.promotion,
        board: situation.board
      }).find(m =>
        m.dest === san.to &&
        m.promotion === san.promotion
      );
      if (m) {
        return m;
      }
    }
  }
}
