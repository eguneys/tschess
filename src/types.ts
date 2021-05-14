export type Maybe<A> = A | undefined

export type San = string
export type San2 = string
export type Fen = string

export const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export type Situation = {
  turn: Color,
  board: Board
}

export type Board = Map<Pos, Piece>

export type Direction = 1|2|3|4|5|6|7|8
export type File = Direction
export type Rank = Direction
export type Pos = [File, Rank];
export type Role = 'b'|'n'|'r'|'q'|'k'|'p'
export type Color = 'w' | 'b';
export type Piece = {
  color: Color,
  role: Role
}

export type DAlong = [Direction, Direction, Direction, Direction, Direction, Direction, Direction, Direction]
export const directions: DAlong = [1,2,3,4,5,6,7,8]
export const rdirections: DAlong = [8,7,6,5,4,3,2,1]

export const files = ['a','b','c','d','e','f','g','h'];
export const ranks = ['1','2','3','4','5','6','7','8'];
export const colors: Color[] = ['w', 'b']
export const roles: Role[] = ['r','b','n','q','k','p'];
export const promotables: Role[] = ['q', 'n', 'r', 'b'];

export type FileKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type RankKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type PosKey = 
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8'
  | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8'
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8'
  | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8'
  | 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8'

export type PieceKey = 
  | 'r' | 'b' | 'n' | 'k' | 'q' | 'p'
  | 'R' | 'B' | 'N' | 'K' | 'Q' | 'P'

export const longRole = {
  'b': 'bishop',
  'n': 'knight',
  'r': 'rook',
  'k': 'king',
  'q': 'queen',
  'p': 'pawn'
}

export const longColor = {
  'w': 'white',
  'b': 'black'
}

export interface SanMeta {
  role: Role,
  file?: File,
  rank?: Rank,
  capture?: boolean,
  to: Pos,
  promotion?: Role,
  check?: boolean,
  mate?: boolean  
}

export type CastleMeta = {
  king: File,
  rook: File,
  trip: 1 | -1
}

export type SanMetaOrCastles = SanMeta | CastleMeta


export type Uci = {
  orig: Pos,
  dest: Pos,
  promotion?: Role
}

export type UciWithSan = {
  uci: UciOrCastles,
  san: San
}

export type UciOrCastles = Uci | CastleMeta
