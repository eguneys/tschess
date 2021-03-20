import { Set, List } from 'immutable';
import { p, nt, db } from 'nefs';
import * as dt from './dtypes';


let { poss } = db;

export function ddir0(_d0: dt.Displace0, d: nt.Direction): nt.Maybe<nt.Direction> {
  let _res = (_d0 + d);
  if (p.isDirection(_res)) {
    return _res;
  }
}

export function ddir1(_d1: dt.Displace1, p: nt.Pos): nt.Maybe<nt.Pos> {
  return poss.mget(ddir0(_d1[0], p[0]), ddir0(_d1[1], p[1]));
}

export function ddir2(_d2: dt.Displace2, p: nt.Pos): Set<nt.Pos> {
  let res = Set<nt.Pos>();
  _d2.forEach(_ => {
    let _res = ddir1(_, p)

    if (_res) {
      res = res.add(_res);
    }
  })
  return res;
}

export type Route0<A> = List<A>
export type Route1<A> = List<Route0<A>>
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


export function rroute0(_d0: dt.Displace0, dir: nt.Direction): Route0<nt.Direction> {
  
  let res: Route0<nt.Direction> = List([dir]);
  let ndir = dir;
  if (_d0 === 0) {
    return res;
  }
  while (true) {
    let _mndir = ddir0(_d0, ndir)

    if (_mndir) {
      ndir = _mndir
      res = res.push(ndir)
    } else {
      break;
    }
  }
  return res;
}

export function rroute1(_d1: dt.Displace1, pos: nt.Pos): Route0<nt.Pos> {

  let f0 = rroute0(_d1[0], pos[0]),
  f1 = rroute0(_d1[1], pos[1]);

  let res: Route0<nt.Pos> = List([poss.pget(f0.first(1), f1.first(1))]);

  let oneWraps = Math.min((_d1[0] === 0 ? f1.size: f0.size), 
                          (_d1[1] === 0 ? f0.size: f1.size))

  for (let i = 1; i < oneWraps; i++) {
    if (res) {
      res = res.push(poss.pget(f0.get(f0.size === 1 ? 0 : i, 1),
                               f1.get(f1.size === 1 ? 0 : i, 1)));
    }
  }
  return res;
}

export function rroute2(_d2: dt.Displace2, pos: nt.Pos): Route1<nt.Pos> {
  let res = List()
  for (let _d1 of _d2) {
    res = res.push(rroute1(_d1, pos));
  }
  return res;
}
