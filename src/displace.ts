import { nt } from 'nefs';
import * as dir from './direction';
import * as dt from './dtypes';

let regulars = {
  'n': dt.DKnight,
  'r': dt.DRook,
  'b': dt.DBishop,
  'q': dt.DQueen,
  'k': dt.DKing
};

let pawns = {
  'w': dt.DWPawn,
  'b': dt.DBPawn,
};

let pawnCaptures = {
  'w': dt.DWPawnC,
  'b': dt.DBPawnC
};

const regularProjection = {
  'p': 1,
  'n': 1,
  'r': 8,
  'b': 8,
  'q': 8,
  'k': 1
}

const pawn2MoveRanks = {
  'w': 2,
  'b': 7
}

const pawnPromoteRanks = {
  'w': 8,
  'b': 1
}

export function promotes(to: nt.Pos, piece: nt.Piece): boolean {
  return piece.role === 'p' &&
    to[1] === pawnPromoteRanks[piece.color];
}

export type Projection = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const projections: Projection[] = [1,2,3,4,5,6,7]

export function route1Captures(pos: nt.Pos, piece: nt.Piece): dir.Route1<nt.Pos> {
  if (piece.role === 'p') {
    return dir.rroute2s.get(pawnCaptures[piece.color], pos);
  }
  return dir.rroute2s.get(regulars[piece.role], pos);
}

export function route1(pos: nt.Pos, piece: nt.Piece): dir.Route1<nt.Pos> {
  if (piece.role === 'p') {
    return dir.rroute2s.get(pawns[piece.color], pos);
  }
  return dir.rroute2s.get(regulars[piece.role], pos);
}

export function projection(pos: nt.Pos, piece: nt.Piece): Projection {
  if (piece.role === 'p') {
    if (pawn2MoveRanks[piece.color] === pos[1]) {
      return 2;
    }
  }
  return regularProjection[piece.role] as Projection;
}

export function displace(a: nt.Direction, b: nt.Direction): dt.Displace0 {
  return (a - b) as dt.Displace0;
}

export function opposite(a: dt.Displace0): dt.Displace0 {
  return a * -1 as dt.Displace0;
}
