import * as color from './color';
import * as p from './pos';
import * as pi from './piece';
import * as r from './role';
import * as nt from './types'
import * as db from './db';
import * as ts from './types2';
import * as dir from './direction';
import { pis } from './db';
import * as u from './util';

let { poss } = db;

export const capture = u.seqable(_capture);
export const move = u.seqable(_move);
export const drop = u.seqable(_drop);
export const pickup = u.seqable(_pickup);
export const promote = u.seqable(_promote);
export const castle = u.seqable(_castle);

export function actorsOf(board: nt.Board): color.CMap<Array<ts.Actor>> {
  let res: color.CMap<Array<ts.Actor>> = {
    w: [],
    b: []
  };
  
  for (let _ of actors(board).values()) {
    res[_.piece.color].push(_);
  }
  return res;
}

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

export const kingPos = (board: nt.Board): color.CMap<nt.Maybe<nt.Pos>> => ({
  w: posOf(board, pis.wK),
  b: posOf(board, pis.bK)
});

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

function _pickup(board: nt.Board, pos: nt.Pos): nt.Maybe<nt.Board> {
  let p = board.get(pos)
  if (p) { 
    let b2 = new Map([...board]);
    b2.delete(pos);
    return b2;
  }
}

function _drop(board: nt.Board, pos: nt.Pos, piece: nt.Piece): nt.Maybe<nt.Board> {
  let b2 = new Map([...board]);
  b2.set(pos, piece);
  return b2;
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
