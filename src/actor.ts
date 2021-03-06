import * as nt from './types';
import * as r from './role';
import * as db from './db';
import * as side from './side';
import * as b from './board';
import * as ts from './types2';
import * as dir from './direction';
import * as disp from './displace';

let { poss, pieces } = db;

export function castles(board: nt.Board, turn: nt.Color, castle: nt.CastleMeta): nt.Maybe<ts.Move> {

  let situationBefore = {
    board,
    turn
  };

  let king = pieces.pget(turn, 'k');
  let rook = pieces.pget(turn, 'r');

  let origKingPos = b.posOf(board, king);

  if (!origKingPos) {
    return;
  }
  let destKingPos = poss.pget(castle.king, origKingPos[1]);

  let rookTrip = 
    dir.rroute0(
      castle.trip,
      origKingPos[0]);

  let origRookPos = b.firstPosForPieceOnRoute(board, rook, origKingPos, rookTrip)
  
  if (!origRookPos) {
    return;
  }

  let destRookPos = poss.pget(castle.rook, origRookPos[1]);

  let after = b.castle(board, origKingPos, destKingPos, origRookPos, destRookPos);

  if (!after) {
    return;
  }

  return {
    piece: king,
    situationBefore,
    after,
    castle: side.ShortCastle,
    orig: origKingPos,
    dest: destKingPos,
  };

}

export function moves({ board, piece, pos }: ts.Actor): Array<ts.Move> {

  let situationBefore = {
    board,
    turn: piece.color
  };

  let projection = disp.projection(pos, piece);

  let captures = disp.route1Captures(pos, piece).flatMap(route0 => {

    let captures: Array<ts.Move> = [];
    
    for (let i = 1; i < projection + 1; i++) {
      let to = route0[i]

      if (!to) {
        continue;
      }

      if (board.get(to)?.color === r.otherColor(piece.color)) {
        if (disp.promotes(to, piece)) {
          nt.promotables.forEach(role => {
            let b1 = b.capture(board, pos, to),
            after = b.promote(b1, to, role);

            if (after) {
              captures.push({
                piece,
                situationBefore,
                after,
                orig: pos,
                dest: to,
                capture: to,
                promotion: role
              });
            }
          });
        } else {
          let after = b.capture(board, pos, to);
          if (after) {
            captures.push({
              piece,
              situationBefore,
              after,
              orig: pos,
              dest: to,
              capture: to
            });
          }
        }
        break;
      }

    }
    return captures;
  });

  let moves = disp.route1(pos, piece).flatMap(route0 => {
    let moves: Array<ts.Move> = [];


    for (let i = 1; i < projection + 1; i++) {
      let to = route0[i]

      if (!to) {
        continue;
      }

      if (!board.get(to)) {
        if (disp.promotes(to, piece)) {
          nt.promotables.forEach(role => {
            let b1 = b.move(board, pos, to),
            after = b.promote(b1, to, role);

            if (after) {
              moves.push({
                piece,
                situationBefore,
                after,
                orig: pos,
                dest: to,
                promotion: role
              });
            }
          });
        } else {
          let after = b.move(board, pos, to)
          if (after) {
            moves.push({
              piece,
              situationBefore,
              after,
              orig: pos,
              dest: to
            });
          }
        }
      } else {
        break;
      }
    }
    return moves;
  });


  return [...moves, ...captures];
}
