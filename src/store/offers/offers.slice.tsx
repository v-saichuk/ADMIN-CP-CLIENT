import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IOffers } from '../../types';

interface IinitialState {
    offers: IOffers[];
    isLoading: boolean;
}

export const getOffers = createAsyncThunk('offers/getOffers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/offers');
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

const initialState: IinitialState = {
    isLoading: false,
    offers: [],
};

const offers = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        create: (state, action) => {
            state.offers.push(action.payload);
        },
        update: (state, action) => {
            state.offers = state.offers.map((el) =>
                el._id === action.payload._id ? { ...el, ...action.payload } : el,
            );
        },
        remove: (state, action) => {
            state.offers = state.offers.filter((el) => el._id !== action.payload);
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getOffers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOffers.fulfilled, (state, action) => {
                state.offers = action.payload;
                state.isLoading = false;
            })
            .addCase(getOffers.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default offers.reducer;

export const { create, remove, update } = offers.actions;
