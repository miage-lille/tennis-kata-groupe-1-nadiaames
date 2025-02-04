import { Player} from './player';

export type Point = Love | Fifteen | Thirty;

export type Love = { kind: 'LOVE'; };
export type Fifteen = { kind: 'FIFTEEN'; };
export type Thirty = { kind: 'THIRTY'; };

export const love = (): Love => ({ kind: 'LOVE' });
export const fifteen = (): Fifteen => ({ kind: 'FIFTEEN' });
export const thirty = (): Thirty => ({ kind: 'THIRTY' });

export type Deuce = {
  kind: 'DEUCE';
};

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export type FortyData = {
  player: Player;
  otherPoint: Point; 
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {player, otherPoint}
})

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

const s1: PointsData = { PLAYER_ONE: love(), PLAYER_TWO: love() };
const s2: PointsData = { PLAYER_ONE: fifteen(), PLAYER_TWO: love() };
const s3: PointsData = { PLAYER_ONE: thirty(), PLAYER_TWO: love() };

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

export type Score = Points | Deuce | Forty | Advantage | Game;
