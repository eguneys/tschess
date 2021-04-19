import * as nt from './types';
import * as p from './pos';
import * as p2 from './pos2';
import * as r from './role';

import * as side from './side';

const shortCastles = ['o-o', 'O-O', '0-0'],
longCastles = ['o-o-o', 'O-O-O', '0-0-0'];

export function str2uci(str: string): nt.Maybe<nt.UciOrCastles> {
  if (shortCastles.includes(str)) {
    return side.ShortCastle;
  } else if (longCastles.includes(str)) {
    return side.LongCastle;
  }
  return uci(str);
}

export function uci(str: string): nt.Maybe<nt.Uci> {
  let RE = /([a-z][1-8])([a-z][1-8])(=?[NBRQ]?)/;

  let m = str.match(RE);

  if (m) {
    let [_, origS, destS, promotionS] = m;

    promotionS = promotionS.replace('=', '');

    let origKey = p.mPosKey(origS),
    destKey = p.mPosKey(destS),
    promotion = r.mRole(promotionS);

    if (origKey && destKey) {

      let orig = p2.pByKey(origKey),
      dest = p2.pByKey(destKey);
      
      return {
        orig,
        dest,
        promotion
      }
    }
  }
}
