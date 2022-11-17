import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IUsers } from '../../types/';

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (params: {}, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/auth/login', params);
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/profile');
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

interface IInitialState {
    isLoading: boolean;
    isAuth: boolean;
    data: IUsers | null;
}

const initialState: IInitialState = {
    isLoading: false,
    isAuth: false,
    data: null,
};

const Auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isAuth = !!state.data ? true : false;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.isLoading = false;
            state.isAuth = false;
        });

        builder.addCase(fetchLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isAuth = !!state.data ? true : false;
        });
        builder.addCase(fetchLogin.rejected, (state) => {
            state.isLoading = false;
            state.isAuth = false;
        });
    },
});

export default Auth.reducer;
export const { logout } = Auth.actions;
