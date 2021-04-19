import * as nt from './types';

export function fen(piece: nt.Piece): string {
  if (piece.color === 'w') {
    return piece.role.toUpperCase();
  }
  return piece.role;
}
