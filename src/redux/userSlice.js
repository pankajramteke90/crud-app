import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    }
});


export const addUser = createAsyncThunk('users/addUser', async (user) => {
    try {
        const response = await axios.post(API_URL, user);
        console.log('API Response after adding user:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error; 
    }
});


export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
    try {
        const response = await axios.put(`${API_URL}/${user.id}`, user);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; 
    }
});


export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
        return userId;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; 
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        addUserLocally: (state, action) => {
            state.users.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index >= 0) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { addUserLocally } = userSlice.actions;

export default userSlice.reducer;
