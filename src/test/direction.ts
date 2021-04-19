import { unf, qed, it, cry } from 'tiqed';
import * as dir from '../direction';
import * as nt from '../types';
import * as db from '../db';
import * as dt from '../dtypes';
import { ps } from './ps';

let {
  e4,
  e5,
  f5,
  g6,
  h7 } = ps;

export default function () {

  it('direction');


  it('ddir0', () => {
    qed('1 2', dir.ddir0(1, 2), 3);
    unf('1 2', dir.ddir0(1, 8));
    unf('1 2', dir.ddir0(-2, 2));
  });

  it('ddir1', () => {
    qed('1 1 e4', dir.ddir1([1,1], e4), f5);
    unf('1 5 e4', dir.ddir1([1,5], e4));
    unf('-5 1 e4', dir.ddir1([-5,1], e4));
  });

  it('ddir2', () => {
    qed('P@e4', dir.ddir2(dt.DWPawn, e4), new Set([e5]));
  });

  it('route0', () => {
    qed('0 1', dir.rroute0(0, 2), [2]);
    qed('-1 3', dir.rroute0(-1, 3), [3, 2, 1]);
  });

  it('route1', () => {

    qed('1,1 e4', dir.rroute1([1,1], e4),
        [e4, f5, g6, h7]);

  });

}
