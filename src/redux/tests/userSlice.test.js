import userReducer, { fetchUsers, addUser, updateUser, deleteUser } from '../userSlice';
import { store } from '../../redux/store';
import axios from 'axios';

jest.mock('axios');

describe('UserSlice', () => {
  it('should return the initial state', () => {
    const initialState = { users: [], loading: false, error: null };
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchUsers.fulfilled', () => {
    const action = { type: fetchUsers.fulfilled.type, payload: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] };
    const state = userReducer({ users: [], loading: false }, action);
    expect(state.users).toEqual(action.payload);
  });

  it('should handle addUser.fulfilled', () => {
    const action = { type: addUser.fulfilled.type, payload: { id: 2, name: 'Jane Doe', email: 'jane@example.com' } };
    const state = userReducer({ users: [{ id: 1, name: 'John' }] }, action);
    expect(state.users).toHaveLength(2);
  });

  it('should handle deleteUser.fulfilled', () => {
    const action = { type: deleteUser.fulfilled.type, payload: 1 };
    const state = userReducer({ users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] }, action);
    expect(state.users).toHaveLength(1);
  });
});
