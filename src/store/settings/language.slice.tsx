import { ReactNode } from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getCountry = createAsyncThunk('language/country', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/language');

        return data;
    } catch (err) {
        console.log('Error language =>>>', err);
        return rejectWithValue(err);
    }
});

interface ILanguage {
    _id: string;
    code: string;
    title: string;
    icon: ReactNode;
    enabled: boolean;
}

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
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(getCountry.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getCountry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lang = action.payload;
                console.log('Language =>', action.payload);
            })
            .addCase(getCountry.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default language.reducer;
