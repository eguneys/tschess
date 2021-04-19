import test from 'ava';
import { nt, f, san, m, tssan } from './_exports';


test('readme', t => {

  let e4 = tssan.moveOrCastle(san.str2meta('e4')!, f.situation(nt.initialFen)!)!;

  t.is(f.fen(m.situationAfter(e4)), 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');
  
});
