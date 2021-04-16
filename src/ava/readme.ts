import test from 'ava';
import { nt, f, san } from 'nefs';
import { m, san as tssan } from '../';


test('readme', t => {

  let e4 = tssan.moveOrCastle(san.str2meta('e4')!, f.situation(nt.initialFen)!)!;

  t.is(f.fen(m.situationAfter(e4)), 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');
  
});
