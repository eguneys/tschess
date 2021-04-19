import * as nt from './types';

export interface Move {
  piece: nt.Piece,
  situationBefore: nt.Situation,
  after: nt.Board,
  orig: nt.Pos,
  dest: nt.Pos,
  capture?: nt.Pos,
  promotion?: nt.Role,
  castle?: nt.CastleMeta,
  enpassant?: nt.Pos
}


export type Actor = {
  pos: nt.Pos,
  piece: nt.Piece,
  promotion?: nt.Role,
  board: nt.Board
}
