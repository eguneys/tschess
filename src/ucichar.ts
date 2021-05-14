import * as nt from './types';
import * as db from './db';
import { hash2, hashfr } from './map2';
import * as side from './side';

export type UciCharPair = string

export function make(a: string, b: string): UciCharPair {
  return a + b;
}

export function pair(uOrc: nt.UciOrCastles) {
  if (side.isCastles(uOrc)) {
    if (uOrc === side.ShortCastle) {
      return 'O-O';
    } else {
      return 'O-O-O';
    }
  }
  let { orig, dest, promotion } = uOrc;
  if (!promotion) {
    return toChar(orig) + toChar(dest);
  } else {
    return toChar(orig) + toCharP(dest[0], promotion);
  }
}

export const voidChar = '!';
const charShift = '#'.charCodeAt(0);

export const pos2CharMap: Map<number, string> = new Map(
  db.poss.all.map(pos =>
    [hash2(pos), String.fromCharCode(hash2(pos) + charShift)]));

let _proCharMap: Array<[number, string]> =
nt.promotables.flatMap((role, i) =>
  nt.directions.map<[number, string]>(file =>
    [hashfr([file, role]),
     String.fromCharCode(charShift + pos2CharMap.size + i * 8 + file)]));

export const promotion2CharMap: Map<number, string> = new Map(_proCharMap);

function toChar(pos: nt.Pos) {
  return pos2CharMap.get(hash2(pos)) || voidChar;
}

function toCharP(file: nt.File, prom: nt.Role) {
  return promotion2CharMap.get(hashfr([file, prom])) || voidChar;
}
