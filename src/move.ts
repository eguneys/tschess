import { nt, r, p, pi, side, db } from 'nefs';
import { moves, castles } from './actor';
import { kingPos } from './situation';
import * as ts from './types';

let { pieces } = db;

export function kingPosBefore(move: ts.Move): nt.Maybe<nt.Pos> {
  return kingPos(move.situationBefore);
}

export function situationAfter(move: ts.Move): nt.Situation {
  return {
    board: move.after,
    turn: r.otherColor(move.piece.color)
  }
}

export function capturedPiece(move: ts.Move): nt.Maybe<nt.Piece> {
  if (move.capture) {
    return move.situationBefore.board.get(move.capture);
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

  let ambigiousFile = false,
  ambigiousRank = false,
  pawnCapture = move.capture && move.piece.role === 'p',
  pawnCaptureOrAmbigiousFile = pawnCapture || ambigiousFile;

  
  
  let pieceS = '',
  fileS = pawnCaptureOrAmbigiousFile?p.fkey(move.orig[0]):'',
  rankS = ambigiousRank?p.rkey(move.orig[1]):'',
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
