import { match } from '../index';

describe('match object', () => {
  it('match object union', () => {
    type Update = { score: number; team?: string } | { result: 'win' | 'lose'; team: string } | { quarter: number };

    const gameUpdate = match<Update>({ score: 5 })
      .when({ score: 5 }, (message) => {
        console.log(`new score ${message.score} for ${message.team}`);
        return { score: message.score, team: message.team };
      })
      .when({ result: 'win' }, (message) => console.log(`${message.team} won`))
      .when({ quarter: Number }, (message) => console.log(`quarter ${message.quarter}`))
      .else();

    expect(gameUpdate).toEqual({ score: 5, team: undefined });
  });
});
