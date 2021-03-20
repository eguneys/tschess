import * as sss from './sss';

export type Displace0 = -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type Displace1 = [Displace0, Displace0]
export type Displace2 = Set<Displace1>;

export const d0s: Displace0[] = [-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7]
export const d1s: Displace1[] = [];

for (let d00 of d0s) {
  for (let d01 of d0s) {
    d1s.push([d00, d01]);
  }
}

export const DKnight: Displace2 = new Set([[-1, 2], [-1, -2],
                                           [1, 2], [1, -2],
                                           [2, 1], [2, -1],
                                           [-2, 1], [-2, -1]])

export const DRook: Displace2 = new Set([[-1, 0], [1, 0], [0, -1], [0, 1]])
export const DBishop: Displace2 = new Set([[-1, 1], [-1, -1], [1, 1], [1, -1]])
export const DQueen: Displace2 = sss.union(DRook,DBishop)
export const DKing: Displace2 = DQueen
export const DWPawn2: Displace2 = new Set([[0, 2]])
export const DBPawn2: Displace2 = new Set([[0, -2]])
export const DWPawn: Displace2 = new Set([[0, 1]])
export const DBPawn: Displace2 = new Set([[0, -1]])
export const DWPawnC: Displace2 = new Set([[1, 1], [-1, 1]])
export const DBPawnC: Displace2 = new Set([[1, -1], [-1, -1]])

export const d2s: Array<Displace2> = [
  DKnight,
  DRook,
  DBishop,
  DQueen,
  DKing,
  DWPawn2,
  DBPawn2,
  DWPawn,
  DBPawn,
  DWPawnC,
  DBPawnC
]
