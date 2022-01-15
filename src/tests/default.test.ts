import { match } from '../index';

describe('match default', () => {
  it('should return default value', () => {
    expect(
      match(2)
        .when(0, () => 1)
        .when(1, () => 2)
        .else('No Match')
    ).toEqual('No Match');
  });
});
