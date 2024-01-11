export enum PlayerSide {
  Cross = 0,
  Nought = 1,
}

export type Cell = {
  Id: number;
  Side: PlayerSide | null;
};

export type Game = {
  gameId: string;
  field: Cell[];
};