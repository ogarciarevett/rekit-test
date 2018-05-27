import {
  HOME_SET_ANSWERS,
} from '../../../../src/features/home/redux/constants';

import {
  setAnswers,
  reducer,
} from '../../../../src/features/home/redux/setAnswers';

describe('home/redux/setAnswers', () => {
  it('returns correct action by setAnswers', () => {
    expect(setAnswers()).toHaveProperty('type', HOME_SET_ANSWERS);
  });

  it('handles action type HOME_SET_ANSWERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_ANSWERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
