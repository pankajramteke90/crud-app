import { store } from '../store';
import { fetchUsers } from '../userSlice';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userSlice';

describe('Redux Store', () => {
  test('store should have the correct initial state', () => {
    const initialState = store.getState();
    expect(initialState.users.users).toEqual([]);
    expect(initialState.users.loading).toBe(false);
    expect(initialState.users.error).toBeNull();
  });

  test('store should handle fetchUsers action', async () => {
    const newStore = configureStore({ reducer: { users: userReducer } });

    await newStore.dispatch(fetchUsers());

    const state = newStore.getState();
    expect(state.users.users).toHaveLength(1);
  });
});
