import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ILanguage } from '../../types';

export const getCountry = createAsyncThunk('language/country', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/language');

        return data;
    } catch (err) {
        console.log('Error language =>>>', err);
        return rejectWithValue(err);
    }
});

interface IInitialState {
    isLoading: boolean;
    lang: ILanguage[];
}

const initialState: IInitialState = {
    isLoading: false,
    lang: [],
};

const language = createSlice({
    name: 'language',
    initialState,
    reducers: {
        update: (state, action) => {
            state.lang = state.lang.map((el) =>
                el._id === action.payload.id ? { ...el, enabled: action.payload.enabled } : el,
            );
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getCountry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCountry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lang = action.payload;
            })
            .addCase(getCountry.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default language.reducer;
export const { update } = language.actions;
