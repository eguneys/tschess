import * as nt from './types';

export type CMap<A> = {
  'w': A,
  'b': A
}

export const opposite: CMap<nt.Color> = {
  'w': 'b',
  'b': 'w'
}
