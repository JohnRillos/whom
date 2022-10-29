export declare type PalsInfo = {
  running: boolean,
  pals: Record<string, Pal>;
};

export enum PalStatus {
  MUTUAL = 'mutual',
  TARGET = 'target',
  LEECHE = 'leeche',
}

export declare type Pal = {
  status: PalStatus,
};
