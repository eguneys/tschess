import { p, nt, db } from 'nefs';
import * as dt from './dtypes';
import { DB2 } from './db';

let { poss } = db;

export const ddir2s = new DB2<dt.Displace2, nt.Pos, Set<nt.Pos>>(
  _ddir2,
  dt.d2s,
  db.poss.all);

export const rroute0s = new DB2<dt.Displace0, nt.Direction, Route0<nt.Direction>>(
  _rroute0,
  dt.d0s,
  nt.directions);

export const rroute1s = new DB2<dt.Displace1, nt.Pos, Route0<nt.Pos>>(
  _rroute1,
  dt.d1s,
  poss.all);

export const rroute2s = new DB2<dt.Displace2, nt.Pos, Route1<nt.Pos>>(
  _rroute2,
  dt.d2s,
  poss.all);



export function ddir0(_d0: dt.Displace0, d: nt.Direction): nt.Maybe<nt.Direction> {
  let _res = (_d0 + d);
  if (p.isDirection(_res)) {
    return _res;
  }
}

export function ddir1(_d1: dt.Displace1, p: nt.Pos): nt.Maybe<nt.Pos> {
  return poss.mget(ddir0(_d1[0], p[0]), ddir0(_d1[1], p[1]));
}

export function _ddir2(_d2: dt.Displace2, p: nt.Pos): Set<nt.Pos> {
  let res = new Set<nt.Pos>();
  _d2.forEach(_ => {
    let _res = ddir1(_, p)

    if (_res) {
      res.add(_res);
    }
  })
  return res;
}

export type Route0<A> = [A] | [A,A] | [A,A,A] | [A,A,A,A] | [A,A,A,A,A] | [A,A,A,A,A,A] | [A,A,A,A,A,A,A] | [A,A,A,A,A,A,A,A]
export type Route1<A> = Array<Route0<A>>
export type RouteFlat<A> = Set<A>

export function isRoute1<A>(_: any): _ is Route1<A> {
  if (Array.isArray(_)) {
    return _.every(isRoute0);
  } else {
    return false;
  }
}

export function isRoute0<A>(_: any): _ is Route0<A> {
  if (Array.isArray(_)) {
    if (_.length >= 1 && _.length <= 8) {
      return _.every(_ =>
        Array.isArray(_) && _.length === 2)
    }
  }
  return false;
}


export function _rroute0(_d0: dt.Displace0, dir: nt.Direction): Route0<nt.Direction> {
  
  let res: Route0<nt.Direction> = [dir]
  let ndir = dir;
  if (_d0 === 0) {
    return res;
  }
  while (true) {
    let _mndir = ddir0(_d0, ndir)

    if (_mndir) {
      ndir = _mndir
      res.push(ndir)
    } else {
      break;
    }
  }
  return res;
}

// export function rrouteflat1(_d2: dt.Displace2, pos: nt.Pos): Set<nt.Pos> {
//   return new Set(rroute2(_d2, pos).flatMap(r1 => {
//     if (r1[1]) {
//       return [r1[1]]
//     } else {
//       return []
//     }
//   }));
// }

export function _rroute2(_d2: dt.Displace2, pos: nt.Pos): Route1<nt.Pos> {
  let res = []
  for (let _d1 of _d2) {
    res.push(rroute1s.get(_d1, pos));
  }
  return res;
}

export function _rroute1(_d1: dt.Displace1, pos: nt.Pos): Route0<nt.Pos> {

  let f0 = rroute0s.get(_d1[0], pos[0]),
  f1 = rroute0s.get(_d1[1], pos[1]);

  let res: Route0<nt.Pos> = [poss.pget(f0[0], f1[0])];

  let oneWraps = Math.min((_d1[0] === 0 ? f1.length: f0.length), 
                          (_d1[1] === 0 ? f0.length: f1.length))

  for (let i = 1; i < oneWraps; i++) {
    if (res) {
      res.push(poss.pget(f0[f0.length === 1 ? 0 : i],
                         f1[f1.length === 1 ? 0 : i]));
    }
  }
  return res;
}
