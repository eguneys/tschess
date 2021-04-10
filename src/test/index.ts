import { tMo, run } from 'tiqed';

import board from './board';
import actor from './actor';
import move from './move';
import dir from './direction';

export default function() {

  tMo(board);
  tMo(actor);
  tMo.only(move);
  tMo(dir);

  run();
}
