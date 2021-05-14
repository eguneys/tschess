import test from 'ava';
import { a, m, nt, f, ps, pis } from './_exports';
import { moves as situationMoves } from '../situation';

test('actor', t => {
  let situation = f.situation('1n1N4/2P5/8/8/8/8/8/8 w - - 0 1')!;


  let wPMoves = situationMoves(situation).get(ps.c7)!,
  captures = wPMoves.filter(_ => _.capture),
  moves = wPMoves.filter(_ => !_.capture),
  cc = captures.map(_ => m.san(_)),
  mm = moves.map(_ => m.san(_));

  t.deepEqual(mm, ['c8=Q','c8=N','c8=R','c8=B']);
  t.deepEqual(cc, ['cxb8=Q','cxb8=N','cxb8=R','cxb8=B']);

  
});
