Chess API written in typescript for [chessishard.com](https://chessishard.com)

It is entirely functional, immutable, and free of side effects.

Based on [Scala Chess](https://github.com/ornicar/scalachess).

## Install

    `yarn add tschess --save`

```
 import { ts, // types
    actor, // actor
    move, // move
    dir, // direction
    disp, // displace
    dt, // dtypes
    board, // board
    san, // san
    uci, // uci
} from 'tschess';

```

## Api

Uses types from [nefs](https://github.com/eguneys/nefs).

See [index.ts](src/index.ts) for exported names.

## Move with San

```

    import { nt, f, san } from 'nefs';
    import { m, san as tssan } from 'tschess';

    // export function moveOrCastle(sanOrCastle: nt.SanMetaOrCastles, situation: nt.Situation): nt.Maybe<tt.Move>;

    let e4 = tssan.moveOrCastle(san.str2meta('e4')!, f.situation(nt.initialFen)!)!;

    f.fen(m.situationAfter(e4)) // returns fen after e4 move.


```

## Move with Uci

Similar functions for Uci type.
