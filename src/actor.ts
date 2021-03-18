import { nt,
         r,
         db,
         side } from 'nefs';

import * as b from './board';
import * as ts from './types';
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

export function actors(board: nt.Board, 
                       piece: nt.Piece,
                       pos: Partial<nt.Pos>,
                       promotion?: nt.Role): Array<ts.Actor> {

  let res: Array<ts.Actor> = [];

  for (let [_pos, _piece] of board.entries()) {
    if (_piece === piece && 
      _pos[0] === (pos[0] || _pos[0]) && 
      _pos[1] === (pos[1] || _pos[1]))

      res.push({
        pos: _pos,
        piece,
        board,
        promotion
      });
  }

  return res;
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

      if (board.get(to)) {

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
      }
    }
    return moves;
  });


  return [...moves, ...captures];
}
