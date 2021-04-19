import { qed, it } from 'tiqed';
import * as nt from '../types';
import * as f from '../fen';
import * as a from '../actor';

export default function () {
  
  it('actor');

  let { board } = f.situation('1n1N4/2P5/8/8/8/8/8/8 w - - 0 1') as nt.Situation;

  // a.actors(board,
  //          wP,
  //          3,
  //          7);
  
  
}
