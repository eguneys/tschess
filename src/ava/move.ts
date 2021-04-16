import test from 'ava';
import { a, m, nt, san, f, ps, pis } from './_exports';
import { moveOrCastle as sanMove } from '../san';

export function playMoves(s: nt.Situation, moves: string) {
  return moves.split(' ')
    .map(san.str2meta)
    .map(_ => _!)
    .reduce((s, _) => m.situationAfter(sanMove(_, s)!), s);
}

export function playMove(s: nt.Situation, move: string) {
  return sanMove(san.str2meta(move)!, s)!;
}

test('Qxf7', t => {
  let Qf3 = playMoves(f.situation(nt.initialFen)!, 'd4 d5 Qf3 a6');

  t.is(m.san(playMove(Qf3, 'Qxf7')), 'Qxf7');  
});

test('exd5', t => {
  let situation = f.situation(nt.initialFen)!;

  let e4d5 = playMoves(situation, 'e4 d5');

  t.is(m.san(playMove(e4d5, 'exd5')), 'exd5');
});

test('d4', t => {
  let situation = f.situation(nt.initialFen)!;

  let move = sanMove(san.str2meta('d4')!, situation)

  t.is(m.san(move!), 'd4');
});

test('move', t => {
  let situation = f.situation(nt.initialFen)!;

  let move = sanMove(san.str2meta('e4')!, situation)

  t.is(m.san(move!), 'e4');
});

test('promotion', t => {
  let situation = f.situation('5n2/4P3/8/8/8/8/8/8 w - - 0 1')!;

  let move = sanMove(san.str2meta('exf8=Q')!, situation)!;

  t.is(move.promotion, 'q');
});


test('promotion 2', t => {
  let situation = f.situation('rnb1kbnr/pppp1p1p/8/4N3/3PP2Q/8/PPP3pP/RNB1KB1R b KQkq - 0 1')!;

  let move = sanMove(san.str2meta('gxh1=Q')!, situation)!;

  t.is(move.promotion, 'q');
});
