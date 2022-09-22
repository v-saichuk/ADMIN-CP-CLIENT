import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export const getCountry = createAsyncThunk('language/country', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch('http://localhost:4000/api/language', { method: 'GET' });

        return await responce.json();
    } catch (err) {
        console.log('Error language =>>>', err);
        return rejectWithValue(err);
    }
});

interface ILanguage {
    code: string;
    title: string;
    icon: ReactNode;
    enabled: boolean;
}

interface IInitialState {
    isLoading: Boolean;
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
        handleLanguage: (state, action) => {
            const [enabled, code] = action.payload;
            state.lang.map((el) => (el.code === code ? (el.enabled = enabled) : { ...state.lang }));
        },
    },
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
export const { handleLanguage } = language.actions;
