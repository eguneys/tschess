import { unf, qed, it, cry } from 'tiqed';
import * as dir from '../direction';
import { nt, db } from 'nefs';
import * as dt from '../dtypes';
import { List, Set } from 'immutable';
import { ps } from './ps';

let {
  e4,
  e5,
  f5,
  g6,
  h7 } = ps;

export type Collection<A> = List<A> | Set<A>

export function qims(msg: string, a: List<any>, b: List<any>): void;
export function qims(msg: string, a: Set<any>, b: Set<any>): void;
export function qims(msg: string, a: Collection<any>, b: Collection<any>): void {
  if (!a.equals(b)) {
    cry(`${msg} got`, a);
  }
}

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
    qims('P@e4', dir.ddir2(dt.DWPawn, e4), Set([e5]));
  });

  it('route0', () => {
    qims('0 1', dir.rroute0(0, 2), List([2]));
    qims('-1 3', dir.rroute0(-1, 3), List([3, 2, 1]));
  });

  it('route1', () => {

    qims('1,1 e4', dir.rroute1([1,1], e4),
         List([e4, f5, g6, h7]));

  });

}
