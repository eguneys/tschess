import * as nt from './types';

export function isRole(_: string): _ is nt.Role {
  return !mRole(_);
}

export function mRole(str: string): nt.Maybe<nt.Role> {
  let _ = str.toLowerCase();
  if (nt.roles.includes(_ as nt.Role)) {
    return _ as nt.Role;
  }
}


export function mColor(str: string): nt.Maybe<nt.Color> {
  let _ = str.toLowerCase();
  if (nt.roles.includes(_ as nt.Role)) {
    if (_ === str) {
      return 'b';
    } else {
      return 'w';
    }
  }
}

export function otherColor(color: nt.Color): nt.Color {
  return color === 'w' ? 'b' : 'w';
}
