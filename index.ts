import { Player, isSamePlayer } from './types/player';
import { Point, PointsData, Score, FortyData, fifteen, thirty, deuce, forty, advantage, game } from './types/score';
import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player): string => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};

export const otherPlayer = (player: Player): Player => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};

// Exercise 1: Implement pointToString and scoreToString

export const pointToString = (point: Point): string => {
  switch (point.kind) {
    case 'LOVE':
      return 'Love';
    case 'FIFTEEN':
      return 'Fifteen';
    case 'THIRTY':
      return 'Thirty';
  }
};

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS': {
      const { PLAYER_ONE, PLAYER_TWO } = score.pointsData;
      return `${pointToString(PLAYER_ONE)} - ${pointToString(PLAYER_TWO)}`;
    }
    case 'DEUCE':
      return 'Deuce';
    case 'FORTY': {
      const { player, otherPoint } = score.fortyData;
      return `${playerToString(player)} at Forty, ${playerToString(otherPlayer(player))} at ${pointToString(otherPoint)}`;
    }
    case 'ADVANTAGE':
      return `Advantage ${playerToString(score.player)}`;
    case 'GAME':
      return `Game ${playerToString(score.player)}`;
  }
};

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};

export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};

export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    matchOpt(
      () => deuce(),
      p => forty(currentForty.player, p) as Score
    )
  );
};

export const scoreWhenAdvantage = (
  advantagedPlayer: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayer, winner)) {
    return game(winner);
  } else {
    return deuce();
  }
};

export const scoreWhenGame = (winner: Player): Score => {
  return game(winner);
};

// Exercise 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const { 
    PLAYER_ONE, 
    PLAYER_TWO 
  } = current;
  if (
    winner === 'PLAYER_ONE'
  ) {
    return pipe(
      incrementPoint(PLAYER_ONE),
      matchOpt(
        () => forty('PLAYER_ONE', PLAYER_TWO) as Score,
        (p) => ({ kind: 'POINTS', pointsData: { PLAYER_ONE: p, PLAYER_TWO } })
      )
    );
  } else {
    return pipe(
      incrementPoint(PLAYER_TWO),
      matchOpt(
        () => forty('PLAYER_TWO', PLAYER_ONE) as Score,
        (p) => ({ kind: 'POINTS', pointsData: { PLAYER_ONE, PLAYER_TWO: p } })
      )
    );
  }
};

export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};