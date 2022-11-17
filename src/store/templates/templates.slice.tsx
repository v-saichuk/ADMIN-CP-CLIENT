import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ITemplates } from '../../types';

interface IInitialState {
    TemplatesData: ITemplates[];
    SectionsData: [];
    isLoading: boolean;
    isLoadingSection: boolean;
}

export const getTemplates = createAsyncThunk(
    'templates/getTemplates',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/templates');
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const getSections = createAsyncThunk(
    'templates/getSections',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/sections');
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

const initialState: IInitialState = {
    isLoading: false,
    isLoadingSection: false,
    TemplatesData: [],
    SectionsData: [],
};

const Templates = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        create: (state, action) => {
            state.TemplatesData.unshift(action.payload);
        },
        update: (state, action) => {
            state.TemplatesData = state.TemplatesData.map((el) =>
                el._id === action.payload._id ? { ...el, ...action.payload } : el,
            );
        },
        updateOne: (state, action) => {
            state.TemplatesData = state.TemplatesData.map((el) =>
                el._id === action.payload.id ? { ...el, enabled: action.payload.enabled } : el,
            );
        },
        remove: (state, action) => {
            state.TemplatesData = state.TemplatesData.filter((el) => el._id !== action.payload);
        },

        duplicateGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.TemplatesData = state.TemplatesData.map((legal) =>
                        legal._id === siteID ? { ...legal, enabled: false } : legal,
                    )),
            );
        },
        removeGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.TemplatesData = state.TemplatesData.filter(
                        (legal) => legal._id !== siteID,
                    )),
            );
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getTemplates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTemplates.fulfilled, (state, action) => {
                state.TemplatesData = action.payload;
                state.isLoading = false;
            })
            .addCase(getTemplates.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getSections.pending, (state) => {
                state.isLoadingSection = true;
            })
            .addCase(getSections.fulfilled, (state, action) => {
                state.SectionsData = action.payload;
                state.isLoadingSection = false;
            })
            .addCase(getSections.rejected, (state, action) => {
                state.isLoadingSection = false;
            });
    },
});

export default Templates.reducer;

export const { create, remove, update, updateOne, duplicateGroup, removeGroup } = Templates.actions;
