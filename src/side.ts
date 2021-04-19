import * as nt from './types';

export const A: nt.File = 1
export const B: nt.File = 2
export const C: nt.File = 3
export const D: nt.File = 4
export const E: nt.File = 5
export const F: nt.File = 6
export const G: nt.File = 7
export const H: nt.File = 8

export const ShortCastle: nt.CastleMeta = {
  king: G,
  rook: F,
  trip: 1
}

export const LongCastle: nt.CastleMeta = {
  king: C,
  rook: D,
  trip: -1
}

export const all = [ShortCastle, LongCastle];

export function isCastles(meta: nt.UciOrCastles): meta is nt.CastleMeta;
export function isCastles(meta: nt.SanMetaOrCastles): meta is nt.CastleMeta;
export function isCastles(meta: any): meta is nt.CastleMeta {
  return ((meta as nt.CastleMeta).king !== undefined)
}
