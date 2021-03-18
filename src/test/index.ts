import { tMo, run } from 'tiqed';

import board from './board';
import actor from './actor';
import move from './move';

export default function() {

  tMo(board);
  tMo(actor);
  tMo(move);

  run();
}
