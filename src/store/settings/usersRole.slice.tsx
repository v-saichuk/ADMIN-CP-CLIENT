import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IRoles } from '../../types';

interface IinitialState {
    roles: IRoles[];
    isLoading: boolean;
}

export const getRoles = createAsyncThunk('roles/getRoles', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/roles');
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

const initialState: IinitialState = {
    isLoading: false,
    roles: [],
};

const usersRole = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        createRole: (state, action) => {
            state.roles.push(action.payload);
        },
        updateRole: (state, action) => {
            console.log('UPDATE ROLE STATE =>', action.payload);
            state.roles = state.roles.map((el) =>
                el._id === action.payload._id ? { ...el, ...action.payload } : el,
            );
        },
        deleteRole: (state, action) => {
            state.roles = state.roles.filter((el) => el._id !== action.payload);
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.roles = action.payload;
                state.isLoading = false;
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default usersRole.reducer;

export const { deleteRole, updateRole, createRole } = usersRole.actions;
