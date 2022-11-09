import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ILegals } from '../../types';

interface IInitialState {
    LegalsData: ILegals[];
    isLoading: boolean;
}

export const getLegals = createAsyncThunk('legals/getLegals', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/legals');
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

const initialState: IInitialState = {
    isLoading: false,
    LegalsData: [],
};

const Legals = createSlice({
    name: 'legals',
    initialState,
    reducers: {
        create: (state, action) => {
            state.LegalsData.unshift(action.payload);
        },
        update: (state, action) => {
            state.LegalsData = state.LegalsData.map((el) =>
                el._id === action.payload._id ? { ...el, ...action.payload } : el,
            );
        },
        updateOne: (state, action) => {
            state.LegalsData = state.LegalsData.map((el) =>
                el._id === action.payload.id ? { ...el, enabled: action.payload.enabled } : el,
            );
        },
        remove: (state, action) => {
            state.LegalsData = state.LegalsData.filter((el) => el._id !== action.payload);
        },

        duplicateGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.LegalsData = state.LegalsData.map((legal) =>
                        legal._id === siteID ? { ...legal, enabled: false } : legal,
                    )),
            );
        },
        removeGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.LegalsData = state.LegalsData.filter((legal) => legal._id !== siteID)),
            );
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getLegals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLegals.fulfilled, (state, action) => {
                state.LegalsData = action.payload;
                state.isLoading = false;
            })
            .addCase(getLegals.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default Legals.reducer;

export const { create, remove, update, updateOne, duplicateGroup, removeGroup } = Legals.actions;
