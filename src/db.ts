import * as nt from './types';
import { bd } from 'bdu';
import * as p from './pos';
import * as r from './role';

export class DB<A, B, SubA, SubB, C> {
  make: (a: A, b: B) => C
  mA: (_: SubA) => A | undefined
  mB: (_: SubB) => B | undefined
  all: Array<C>
  space: Map<A, Map<B, C>>

  constructor(make: (a: A, b: B) => C,
              mA: (_: SubA) => A | undefined,
              mB: (_: SubB) => B | undefined,
              allA: Array<A>,
              allB: Array<B>) {
    this.space = new Map()
    this.make = make
    this.mA = mA
    this.mB = mB

    this.all = []

    for (let a of allA) {
      for (let b of allB) {
        this.all.push(this.pget(a, b))
      }
    }
  }

  pget(a: A, b: B): C {
    let bc = this.space.get(a);
    if (bc) {

      let c = bc.get(b);

      if (c) {
        return c;
      } else {
        let _c = this.make(a, b);
        bc.set(b, _c);
        return _c;
      }      

    } else {
      let c = this.make(a, b);
      let bc = new Map()
        .set(b, c);
      this.space.set(a, bc);
      return c;
    }
  }

  nget(sa: SubA, sb: SubB): C | undefined {
    return this.mget(this.mA(sa),
                     this.mB(sb));
  }

  mget(ma: A | undefined, mb: B | undefined): C | undefined {
    if (ma && mb) {
      return this.pget(ma, mb);
    }
  }
}

export const poss = new DB<nt.Direction, nt.Direction, number, number, nt.Pos>(
  ((f, r) => [f, r]),
  p.mDirection,
  p.mDirection,
  nt.directions,
  nt.directions)
export const pieces = new DB<nt.Color, nt.Role, string, string, nt.Piece>(
  (color, role) => ({ color, role }),
  r.mColor,
  r.mRole,
  nt.colors,
  nt.roles)


export const pis = {
  wR: pieces.nget('R', 'R')!,
  wB: pieces.nget('B', 'B')!,
  wN: pieces.nget('N', 'N')!,
  wK: pieces.nget('K', 'K')!,
  wQ: pieces.nget('Q', 'Q')!,
  wP: pieces.nget('P', 'P')!,
  bR: pieces.nget('r', 'r')!,
  bB: pieces.nget('b', 'b')!,
  bN: pieces.nget('n', 'n')!,
  bK: pieces.nget('k', 'k')!,
  bQ: pieces.nget('q', 'q')!,
  bP: pieces.nget('p', 'p')!,
};

export const ps = {
  a1: poss.pget(1, 1)!,
  a2: poss.pget(1, 2)!,
  a3: poss.pget(1, 3)!,
  a4: poss.pget(1, 4)!,
  a5: poss.pget(1, 5)!,
  a6: poss.pget(1, 6)!,
  a7: poss.pget(1, 7)!,
  a8: poss.pget(1, 8)!,
  b1: poss.pget(2, 1)!,
  b2: poss.pget(2, 2)!,
  b3: poss.pget(2, 3)!,
  b4: poss.pget(2, 4)!,
  b5: poss.pget(2, 5)!,
  b6: poss.pget(2, 6)!,
  b7: poss.pget(2, 7)!,
  b8: poss.pget(2, 8)!,
  c1: poss.pget(3, 1)!,
  c2: poss.pget(3, 2)!,
  c3: poss.pget(3, 3)!,
  c4: poss.pget(3, 4)!,
  c5: poss.pget(3, 5)!,
  c6: poss.pget(3, 6)!,
  c7: poss.pget(3, 7)!,
  c8: poss.pget(3, 8)!,
  d1: poss.pget(4, 1)!,
  d2: poss.pget(4, 2)!,
  d3: poss.pget(4, 3)!,
  d4: poss.pget(4, 4)!,
  d5: poss.pget(4, 5)!,
  d6: poss.pget(4, 6)!,
  d7: poss.pget(4, 7)!,
  d8: poss.pget(4, 8)!,
  e1: poss.pget(5, 1)!,
  e2: poss.pget(5, 2)!,
  e3: poss.pget(5, 3)!,
  e4: poss.pget(5, 4)!,
  e5: poss.pget(5, 5)!,
  e6: poss.pget(5, 6)!,
  e7: poss.pget(5, 7)!,
  e8: poss.pget(5, 8)!,
  f1: poss.pget(6, 1)!,
  f2: poss.pget(6, 2)!,
  f3: poss.pget(6, 3)!,
  f4: poss.pget(6, 4)!,
  f5: poss.pget(6, 5)!,
  f6: poss.pget(6, 6)!,
  f7: poss.pget(6, 7)!,
  f8: poss.pget(6, 8)!,
  g1: poss.pget(7, 1)!,
  g2: poss.pget(7, 2)!,
  g3: poss.pget(7, 3)!,
  g4: poss.pget(7, 4)!,
  g5: poss.pget(7, 5)!,
  g6: poss.pget(7, 6)!,
  g7: poss.pget(7, 7)!,
  g8: poss.pget(7, 8)!,
  h1: poss.pget(8, 1)!,
  h2: poss.pget(8, 2)!,
  h3: poss.pget(8, 3)!,
  h4: poss.pget(8, 4)!,
  h5: poss.pget(8, 5)!,
  h6: poss.pget(8, 6)!,
  h7: poss.pget(8, 7)!,
  h8: poss.pget(8, 8)!
};
