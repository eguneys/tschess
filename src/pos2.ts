import * as nt from './types';
import * as db from './db';
import * as p from './pos';

export const pByKey = (_: p.PosKey): nt.Pos => {
  return db.poss.pget(p.fByKey(p.posKey2fKey(_)),
                        p.rByKey(p.posKey2rKey(_)));
}
