import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IWebsites } from '../../types';

interface IinitialState {
    websites: IWebsites[];
    isLoading: boolean;
}

export const getWebsites = createAsyncThunk(
    'websites/getWebsites',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/websites');
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

const initialState: IinitialState = {
    isLoading: false,
    websites: [],
};

const websites = createSlice({
    name: 'websites',
    initialState,
    reducers: {
        create: (state, action) => {
            state.websites.push(action.payload);
        },
        update: (state, action) => {
            state.websites = state.websites.map((el) =>
                el._id === action.payload._id ? { ...el, ...action.payload } : el,
            );
        },
        updateOne: (state, action) => {
            state.websites = state.websites.map((el) =>
                el._id === action.payload.id ? { ...el, enabled: action.payload.enabled } : el,
            );
        },
        remove: (state, action) => {
            state.websites = state.websites.filter((el) => el._id !== action.payload);
        },

        activateGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.websites = state.websites.map((website) =>
                        website._id === siteID ? { ...website, enabled: true } : website,
                    )),
            );
        },
        deactivateGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.websites = state.websites.map((website) =>
                        website._id === siteID ? { ...website, enabled: false } : website,
                    )),
            );
        },
        removeGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.websites = state.websites.filter((website) => website._id !== siteID)),
            );
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getWebsites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWebsites.fulfilled, (state, action) => {
                state.websites = action.payload;
                state.isLoading = false;
            })
            .addCase(getWebsites.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default websites.reducer;

export const { create, remove, update, updateOne, activateGroup, deactivateGroup, removeGroup } =
    websites.actions;
