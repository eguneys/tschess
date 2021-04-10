import { nt, r, p, pi, side, db } from 'nefs';
import { actor, moves, castles } from './actor';
import * as ts from './types';

let { pieces } = db;

export function move(before: nt.Situation, sanMeta: nt.SanMetaOrCastles): nt.Maybe<ts.Move> {
  if (side.isCastles(sanMeta)) {
    return castles(before.board, before.turn, sanMeta);
  } else {
    return _move(before, sanMeta);
  }
}

function _move(before: nt.Situation, sanMeta: nt.SanMeta): nt.Maybe<ts.Move> {

  let _actor = actor(before.board, 
                     pieces.pget(before.turn, sanMeta.role),
                     sanMeta.file,
                     sanMeta.rank,
                     sanMeta.promotion);

  if (_actor) {
    return moves(_actor)
      .find(_ => _.dest === sanMeta.to);
  }
}

export function situationAfter(move: ts.Move): nt.Situation {
  return {
    board: move.after,
    turn: r.otherColor(move.piece.color)
  }
}

export const promotionS = (promotion: nt.Role) =>
  `=${promotion.toUpperCase()}`;

export function uci(move: ts.Move): string {
  return p.key(move.orig) + p.key(move.dest) + (move.promotion ? promotionS(move.promotion):'');
}

export function san(move: ts.Move): string {
  if (move.castle === side.ShortCastle) {
    return "O-O";
  } else if (move.castle === side.LongCastle) {
    return "O-O-O";
  }
  let pieceS = '',
  fileS = '',
  rankS = '',
  captureS = move.capture?'x':'',
  toS = p.key(move.dest),
  _promotionS = move.promotion?promotionS(move.promotion):'',
  checkS = '',
  mateS = '';
  
  if (move.piece.role !== 'p') {
    pieceS = pi.fen(move.piece).toUpperCase();
  }

  return [pieceS, fileS, rankS, captureS, toS, _promotionS, checkS, mateS].join('');
}

export function str(move: ts.Move): string {
  return p.key(move.orig) + p.key(move.dest);
}
