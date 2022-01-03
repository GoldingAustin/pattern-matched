import { match } from '../index';

type Update = { score: number; team?: string } | { result: 'win' | 'lose'; team: string } | { quarter: number };

const gameUpdate = (condition: Update) =>
  match(condition)
    .when({ score: 5 }, (message) => {
      console.log(`new score ${message.score} for ${message.team}`);
      return { score: message.score, team: message.team };
    })
    .when({ result: 'win' }, (message) => {
      console.log(`${message.team} won`);
      return `${message.team} won`;
    })
    .when({ quarter: Number }, (message) => {
      console.log(`quarter ${message.quarter} ended`);
      return message.quarter + 1;
    })
    .else();

describe('match object', () => {
  it('match object union', () => {
    expect(gameUpdate({ score: 5 })).toEqual({ score: 5, team: undefined });
    expect(gameUpdate({ result: 'win', team: 'Red' })).toEqual('Red won');
  });

  it('fallback case when condition has no when handler', () => {
    expect(gameUpdate({ result: 'lose', team: 'Blue' })).toEqual(undefined);
  });

  it('match quarter type', () => {
    expect(gameUpdate({ quarter: 2 })).toEqual(3);
  });
});
