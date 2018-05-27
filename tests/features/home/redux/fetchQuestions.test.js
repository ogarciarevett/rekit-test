import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_QUESTIONS_BEGIN,
  HOME_FETCH_QUESTIONS_SUCCESS,
  HOME_FETCH_QUESTIONS_FAILURE,
  HOME_FETCH_QUESTIONS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchQuestions,
  dismissFetchQuestionsError,
  reducer,
} from '../../../../src/features/home/redux/fetchQuestions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchQuestions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchQuestions succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchQuestions())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_QUESTIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_QUESTIONS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchQuestions fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchQuestions({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_QUESTIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_QUESTIONS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchQuestionsError', () => {
    const expectedAction = {
      type: HOME_FETCH_QUESTIONS_DISMISS_ERROR,
    };
    expect(dismissFetchQuestionsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_QUESTIONS_BEGIN correctly', () => {
    const prevState = { getQuestionsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_QUESTIONS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getQuestionsPending).toBe(true);
  });

  it('handles action type HOME_FETCH_QUESTIONS_SUCCESS correctly', () => {
    const prevState = { getQuestionsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_QUESTIONS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getQuestionsPending).toBe(false);
  });

  it('handles action type HOME_FETCH_QUESTIONS_FAILURE correctly', () => {
    const prevState = { getQuestionsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_QUESTIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getQuestionsPending).toBe(false);
    expect(state.getQuestionsError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_QUESTIONS_DISMISS_ERROR correctly', () => {
    const prevState = { getQuestionsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_QUESTIONS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getQuestionsError).toBe(null);
  });
});

