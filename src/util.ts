export const seqable = <T,>(cb: (x: T, ...args: any) => T | undefined) =>
  (x: T | undefined, ...args: any) =>
  typeof x === "undefined" ? undefined : cb(x, ...args);
