import { Player } from './player';

export type Point = number;

export const love = (): Point => 0;
export const fifteen = (): Point => 15;
export const thirty = (): Point => 30;
export const fortyPoints = (): Point => 40;

export type Deuce = {
  kind: 'DEUCE';
};

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export type Forty = {
  kind: 'FORTY';
  leadingPlayer: Player;
  trailingPlayerPoints: Point;
};

export const forty = (leadingPlayer: Player, trailingPlayerPoints: Point): Forty => ({
  kind: 'FORTY',
  leadingPlayer,
  trailingPlayerPoints,
});

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export type Game = {
  kind: 'GAME';
  player: Player;
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

export type Score = Points | Deuce | Forty | Advantage | Game;
