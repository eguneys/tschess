import { nt, r, p, pi, side, db } from 'nefs';
import { actors, moves, castles } from './actor';
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

  let _actors = actors(before.board, 
                       pieces.pget(before.turn, sanMeta.role),
                       [sanMeta.file, sanMeta.rank],
                       sanMeta.promotion);

  return _actors.flatMap(actor =>
    moves(actor)
      .filter(_ => _.dest === sanMeta.to))[0];
}

export function situationAfter(move: ts.Move): nt.Situation {
  return {
    board: move.after,
    turn: r.otherColor(move.piece.color)
  }
}

export function uci(move: ts.Move): string {
  return p.key(move.orig) + p.key(move.dest);
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
  captureS = '',
  toS = p.key(move.dest),
  promotionS = '',
  checkS = '',
  mateS = '';
  
  if (move.piece.role !== 'p') {
    pieceS = pi.fen(move.piece).toUpperCase();
  }

  return [pieceS, fileS, rankS, captureS, toS, promotionS, checkS, mateS].join('');
}

export function str(move: ts.Move): string {
  return p.key(move.orig) + p.key(move.dest);
}
