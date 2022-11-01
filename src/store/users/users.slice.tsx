import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IUsers } from '../../types';

export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/users');
        return data;
    } catch (e) {
        console.log('Error getUsers =>', e);
        return rejectWithValue(e);
    }
});

interface IInitialState {
    isActive: boolean;
    isLoading: boolean;
    users: IUsers[];
}

const initialState: IInitialState = {
    isActive: false,
    isLoading: false,
    users: [],
};

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((el) => el._id !== action.payload);
        },
        editUser: (state, action) => {
            state.users = state.users.map((user) =>
                user._id === action.payload._id ? { ...user, ...action.payload } : user,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default users.reducer;
export const { createUser, editUser, deleteUser } = users.actions;
