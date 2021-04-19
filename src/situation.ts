import * as tt from './types2';
import * as nt from './types';
import * as side from './side';
import { actors as boardActors, actorsOf, kingPos as boardKingPos } from './board';
import { moves as actorMoves, castles as actorCastles } from './actor';

export function kingPos(situation: nt.Situation): nt.Maybe<nt.Pos> {
  return boardKingPos(situation.board)[situation.turn];
}

export function actors(situation: nt.Situation): Array<tt.Actor> {
  return actorsOf(situation.board)[situation.turn];
}

export function castles(situation: nt.Situation): Array<tt.Move> {
  return side.all
    .map(_ => actorCastles(situation.board, situation.turn, _))
    .flatMap(_ => _ ? _ : []);
}

export function moves(situation: nt.Situation): Map<nt.Pos, Array<tt.Move>> {
  let res: Map<nt.Pos, Array<tt.Move>> = new Map();
  
  actors(situation).forEach(_ => {
    let aMoves = actorMoves(_);
    if (aMoves.length > 0) {
      res.set(_.pos, aMoves);
    }
  });

  return res;
}
