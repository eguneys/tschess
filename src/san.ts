import * as nt from './types';
import * as p from './pos';
import * as r from './role';
import * as side from './side';
import { poss } from './db';

const shortCastles = ['o-o', 'O-O', '0-0'],
longCastles = ['o-o-o', 'O-O-O', '0-0-0'];

export function str2meta(str: string): nt.Maybe<nt.SanMetaOrCastles> {
  if (shortCastles.includes(str)) {
    return side.ShortCastle;
  } else if (longCastles.includes(str)) {
    return side.LongCastle;
  }
  if (!isSan2(str)) {
    let str2 = san2san2(str)
    if (str2) {
      return san2meta(str2);
    }
  } else {
    return san2meta(str);
  }
}

export function sBool(str: string): boolean {
  if (str === '') {
    return false;
  }
  return true;
}

export function san2meta(san2: nt.San2): nt.Maybe<nt.SanMeta> {
  let res = san2.split(' ');
  let [roleS, fileS, rankS, captureS, toS, promotionS, checkS, mateS] = res;

  promotionS = promotionS.replace('=', '');
  
  let mate = sBool(mateS),
  check = sBool(checkS),
  capture = sBool(captureS),
  mRankKey = p.mRankKey(rankS),
  mFileKey = p.mFileKey(fileS);

  let rank = mRankKey ? p.rByKey(mRankKey): undefined;
  let file = mFileKey ? p.fByKey(mFileKey): undefined;
  let mrole = r.mRole(roleS),
  promotion = r.mRole(promotionS)

  let mToKey = p.mPosKey(toS);

  if (mToKey) {

    let toFKey = p.posKey2fKey(mToKey),
    toRKey = p.posKey2rKey(mToKey),
    toF = p.fByKey(toFKey),
    toR = p.rByKey(toRKey),
    to: nt.Pos = poss.pget(toF, toR)

    if (to) {
      return {
        file,
        rank,
        check,
        mate,
        capture,
        promotion,
        to,
        role: mrole ? mrole : 'p'
      }
    }
  }
}

export function isSan2(str: string): str is nt.San2 {
  let res = str.split(' ');
  if (res.length === 8) {
    let [role, file, rank, capture, to, promotion, check, mate] = res;

    let RES = [/N|B|R|Q|K|/,
               /[a-h]?/,
               /([1-8]?)/,
               /(x?)/,
               /([a-h][0-9])/,
               /(=?[NBRQ]?)/,
               /(\+?)/,
               /(\#?)/];

    for (let key in RES) {
      if (!res[key].match(RES[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

export function san2san2(san: nt.San): nt.Maybe<nt.San2> {

  let RE = /(N|B|R|Q|K|)([a-h]?)([1-8]?)(x?)([a-h][0-9])(=?[NBRQ]?)(\+?)(\#?)/;

  let m = san.match(RE);

  if (m) {
    let [_, role, file, rank, capture, to, promotion, check, mate] = m;
    let res: nt.San2 = [role,file,rank,capture,to,promotion,check,mate].join(' ');
    return res;
  }
}
