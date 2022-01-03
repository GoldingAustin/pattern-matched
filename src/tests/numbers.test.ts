import { match } from '../index';

describe('match', () => {
  it('match number', () => {
    expect(
      match(1)
        .when(0, () => 1)
        .when(1, () => 2)
        .else()
    ).toEqual(2);
  });
  it('No matching number', () => {
    expect(
      match(2)
        .when(0, () => 1)
        .when(1, () => 2)
        .else()
    ).toEqual(undefined);
  });
  it('Static product', () => {
    expect(match(1).when(0, 1).when(1, 2).else()).toEqual(2);
  });
  it('match number array', () => {
    expect(
      match([0, 2])
        .when([0, 1], () => 1)
        .when([0, 2, 5], () => 2)
        .when([0, 2], () => 3)
        .else()
    ).toEqual(3);
  });
});
