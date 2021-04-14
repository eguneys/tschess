import test from 'ava';
import * as misc from '../misc';

test('fen after ucis', t => {

  t.is(misc.fenAfterUcis('startpos', 'e2e4 e7e5'.split(' ')),
       'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1');
  
});
