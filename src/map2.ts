import * as nt from './types';

export function hash2([f, r]: nt.Pos) {
  return f * 8 + r
}

export function hashfr([f, r]: [nt.File, nt.Role]) {
  return f + r.charCodeAt(0);
}
