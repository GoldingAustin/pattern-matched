import { match } from '../index';

describe('match', () => {
  it('match number', () => {
    expect(
      match(1)
        .by(0, () => 1)
        .by(1, () => 2)
        .end()
    ).toEqual(2);
  });
  it('No matching number', () => {
    expect(
      match(2)
        .by(0, () => 1)
        .by(1, () => 2)
        .end()
    ).toEqual(undefined);
  });
  it('match number array', () => {
    expect(
      match([0, 2])
        .by([0, 1], () => 1)
        .by([0, 2, 5], () => 2)
        .by([0, 2], () => 3)
        .end()
    ).toEqual(3);
  });
});
