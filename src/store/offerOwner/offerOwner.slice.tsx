import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IOfferOwner } from '../../types';

interface IinitialState {
    offerOwner: IOfferOwner[];
    isLoading: boolean;
}

export const getOfferOwner = createAsyncThunk(
    'offerOwner/getOfferOwner',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/offer-owner');
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

const initialState: IinitialState = {
    isLoading: false,
    offerOwner: [],
};

const offerOwner = createSlice({
    name: 'offerOwner',
    initialState,
    reducers: {
        create: (state, action) => {
            state.offerOwner.push(action.payload);
        },
        update: (state, action) => {
            state.offerOwner = state.offerOwner.map((el) =>
                el._id === action.payload._id ? { ...el, ...action.payload } : el,
            );
        },
        remove: (state, action) => {
            state.offerOwner = state.offerOwner.filter((el) => el._id !== action.payload);
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getOfferOwner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOfferOwner.fulfilled, (state, action) => {
                state.offerOwner = action.payload;
                state.isLoading = false;
            })
            .addCase(getOfferOwner.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default offerOwner.reducer;

export const { create, remove, update } = offerOwner.actions;
