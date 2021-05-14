import test from 'ava';
import { nt, uc, poss } from './_exports';
import { uci } from '../uci';

function conv(uci: nt.Uci) {
  return uc.pair(uci)
}

function unique<A>(value: A, index: number, self: Array<A>) {
  return self.indexOf(value) === index;
}


let allMoves: Array<nt.Uci> = [];
for (let orig of poss.all) {
  for (let dest of poss.all) {
    allMoves.push({
      orig,
      dest
    });
  }
}
let allPairs = allMoves.map(conv);

console.log(uc.pos2CharMap);
console.log(uc.promotion2CharMap);

test('char pair encoding', t => {
  
  t.is(conv(uci('a1b1')!), ',4');
  t.is(conv(uci('a1a2')!), ',-');
  t.is(conv(uci('h7h8')!), 'jk');
});

test('unicity', t => {
  t.is(allPairs.filter(unique).length, allMoves.length);
});


test('no void char', t => {
  t.is(allPairs.filter(_ => _.match(uc.voidChar)).length, 0)
});

test('promotions', t => {
  t.is(conv(uci('b7b8=Q')!), ':t');
  t.is(conv(uci('b7c8=Q')!), ':u');
  t.is(conv(uci('b7c8=N')!), ':n');
});
