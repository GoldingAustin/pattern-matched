import { match } from '../index';

type Update =
  | { type: 'score'; score: number; team?: string }
  | { type: 'result'; result: 'win' | 'lose'; team: string }
  | { type: 'quarter'; quarter: number };

const gameUpdate = (condition: Update) =>
  match(condition)
    .when({ type: 'score' }, (message) => {
      console.log(`new score ${message.score} for ${message.team}`);
      return { score: message.score, team: message.team };
    })
    .when({ type: 'result' }, (message) => {
      console.log(`${message.team} won`);
      return `${message.team} won`;
    })
    .when({ quarter: Number }, (message) => {
      console.log(`quarter ${message.quarter} ended`);
      return message.quarter + 1;
    })
    .else();

describe('match event types', () => {
  it('match object union', () => {
    expect(gameUpdate({ type: 'score', score: 5 })).toEqual({ score: 5, team: undefined });
    expect(gameUpdate({ type: 'result', result: 'win', team: 'Red' })).toEqual('Red won');
  });

  it('fallback case when condition has no when handler', () => {
    expect(gameUpdate({ type: 'result', result: 'lose', team: 'Blue' })).toEqual('Blue won');
  });

  it('match quarter type', () => {
    expect(gameUpdate({ type: 'quarter', quarter: 2 })).toEqual(3);
  });
});
