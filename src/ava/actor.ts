import test from 'ava';
import { a, m, nt, f, ps, pis } from './_exports';


test('actor', t => {
  let { board } = f.situation('1n1N4/2P5/8/8/8/8/8/8 w - - 0 1') as nt.Situation;


  let wP = a.actor(board, pis.wP, 3, 7)!;

  let all = a.moves(wP),
  captures = all.filter(_ => _.capture),
  moves = all.filter(_ => !_.capture),
  cc = captures.map(_ => m.san(_)),
  mm = moves.map(_ => m.san(_));

  t.deepEqual(mm, ['c8=R','c8=B','c8=N','c8=Q']);
  t.deepEqual(cc, ['b8=R','b8=B','b8=N','b8=Q']);

  
});
