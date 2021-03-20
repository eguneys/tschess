import { qed, it } from 'tiqed';
import { nt, db } from 'nefs';
import * as dt from '../dtypes';
import * as dir from '../direction';
import * as disp from '../displace';
import * as ts from '../types';

let { poss, pieces } = db;

export default function() {

  let e4 = poss.pget(5, 4) as nt.Pos
  let a8 = poss.pget(1, 8) as nt.Pos
  let wR = pieces.nget('R', 'R') as nt.Piece
  it('board');

  it('returns same reference', () => {

    qed('route1', disp.route1(a8, wR).get(0) ===
      disp.route1(a8, wR).get(3), true);

    let res = dir.rroute2(dt.DRook, a8);

    qed('route2', res.get(0) === res.get(3), true);
  });
  

}
