import { p, 
         pi,
         r,
         nt,
         db  } from 'nefs';

import * as ts from './types';
import * as dir from './direction';

import * as u from './util';

let { poss } = db;

export const capture = u.seqable(_capture);
export const move = u.seqable(_move);
export const promote = u.seqable(_promote);
export const castle = u.seqable(_castle);

export function actors(board: nt.Board): Map<nt.Pos, ts.Actor> {
  let res = new Map()
  for (let [pos, piece] of board) {
    if (piece.role === 'p') {
      for (let promotion of nt.promotables) {
        res.set(pos, {
          pos,
          piece,
          board,
          promotion
        });
      }
    } else {
      res.set(pos, {
        pos,
        piece,
        board
      });
    }
  }
  return res;
}

export function firstPosForPieceOnRoute(board: nt.Board, 
                                        piece: nt.Piece,
                                        pos: nt.Pos,
                                        trip: dir.Route0<nt.Direction>): nt.Maybe<nt.Pos> {

  return [...board.entries()]
    .filter(([pos, _piece]) => piece === _piece && trip.includes(pos[0]))
    .map(([k]) => k)[0];

}

export function posOf(board: nt.Board, piece: nt.Piece, file?: nt.File): nt.Maybe<nt.Pos> {
  return [...board.entries()]
    .filter(([pos, _piece]) => (pos[0] === file || pos[0]) && piece === _piece)
    .map(([k]) => k)[0];
}

export function fen(board: nt.Board): string {
  let res = [];
  for (let rank of nt.directions.slice(0).reverse()) {
    let rankS = '';
    let space = 0;
    for (let file of nt.directions) {
      let piece = board.get(poss.pget(file, rank));
      if (piece) {
        if (space !== 0) {
          rankS += space;
          space = 0;
        }
        rankS += pi.fen(piece);
      } else {
        space++;
      }
    }
    if (space !== 0) {
      rankS += space;
    }
    res.push(rankS);
  }
  return res.join('/');
}

function _castle(board: nt.Board, 
                 origKing: nt.Pos,
                 destKing: nt.Pos,
                 origRook: nt.Pos,
                 destRook: nt.Pos): nt.Maybe<nt.Board> {

  let king = board.get(origKing),
  rook = board.get(origRook);

  if (king && rook) {
    let b2 = new Map([...board]);
    b2.delete(origKing);
    b2.delete(origRook);
    b2.set(destKing, king);
    b2.set(destRook, rook);
    return b2;
  }
  
}

function _capture(board: nt.Board, pos: nt.Pos, to: nt.Pos): nt.Maybe<nt.Board> {
  let p = board.get(pos)
  if (p) {
    let b2 = new Map([...board])
    b2.delete(pos);
    b2.set(to, p);

    return b2;
  }  
}

function _move(board: nt.Board, pos: nt.Pos, to: nt.Pos): nt.Maybe<nt.Board> {

  let p = board.get(pos)
  if (p) {
    let b2 = new Map([...board])
    b2.delete(pos);
    b2.set(to, p);

    return b2;
  }
}

function _promote(board: nt.Board, pos: nt.Pos, to: nt.Role): nt.Maybe<nt.Board> {
  let p = board.get(pos);
  if (p) {
    let p2 = {
      role: to,
      color: p.color
    };
    let b2 = new Map([...board]);
    b2.delete(pos);
    b2.set(pos, p2);

    return b2;
  }
}
