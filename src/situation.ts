import * as tt from './types';
import { nt, side } from 'nefs';
import { actors as boardActors, actorsOf } from './board';
import { moves as actorMoves, castles as actorCastles } from './actor';

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
