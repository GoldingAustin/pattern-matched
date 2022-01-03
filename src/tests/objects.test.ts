import { match } from '../index';

describe('match object', () => {
  it('match object union', () => {
    type Update = { score: number; team?: string } | { result: 'win' | 'lose'; team: string } | { quarter: number };
    expect(
      match<Update>({ score: 5 })
        .by({ score: 5 }, (message) => {
          console.log(`new score ${message.score} for ${message.team}`);
          return { score: message.score, team: message.team };
        })
        .by({ result: 'win' }, (message) => console.log(`${message.team} won`))
        .by({ quarter: Number }, (message) => console.log(`quarter ${message.quarter}`))
        .end()
    ).toEqual({ score: 5, team: undefined });
  });
});
