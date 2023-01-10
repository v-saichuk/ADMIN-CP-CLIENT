import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ILandings } from '../../types';

interface IInitialState {
    landingsData: ILandings[];
    isLoading: boolean;
    isLoadingSection: boolean;
}

export const getLandings = createAsyncThunk(
    'templates/getLandings',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/landings');
            console.log('data landings =>', data);
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

const initialState: IInitialState = {
    isLoading: false,
    isLoadingSection: false,
    landingsData: [],
};

const Landings = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        create: (state, action) => {
            state.landingsData.unshift(action.payload);
        },

        update: (state, action) => {
            state.landingsData = state.landingsData.map((landing) =>
                landing._id === action.payload._id ? { ...landing, ...action.payload } : landing,
            );
        },

        updateOne: (state, action) => {
            state.landingsData = state.landingsData.map((landing) =>
                landing._id === action.payload.id
                    ? { ...landing, status: action.payload.status }
                    : landing,
            );
        },

        remove: (state, action) => {
            state.landingsData = state.landingsData.filter(
                (landing) => landing._id !== action.payload,
            );
        },

        duplicateGroup: (state, action) => {
            state.landingsData = action.payload;
        },

        removeGroup: (state, action) => {
            action.payload.map(
                (id: string) =>
                    (state.landingsData = state.landingsData.filter(
                        (landing) => landing._id !== id,
                    )),
            );
        },

        // SECTIONS
        sectionCreate: (state, action) => {
            state.landingsData.find(
                (landing) =>
                    landing._id === action.payload.landingId &&
                    (landing.sections = action.payload.sections),
            );
        },
        sectionsUpdate: (state, action) => {
            state.landingsData.find(
                (template) =>
                    template._id === action.payload.landingId &&
                    template.sections.find(
                        (section) =>
                            section._id === action.payload.sectionId &&
                            (section.title = action.payload.title),
                    ),
            );
        },
        sectionsDelete: (state, action) => {
            state.landingsData.find(
                (landing) =>
                    landing._id === action.payload.landingId &&
                    (landing.sections = landing.sections.filter(
                        (section) => section._id !== action.payload.sectionId,
                    )),
            );
        },
        // ./SECTIONS

        // FIELD
        fieldCreate: (state, action) => {
            const landing_id = action.payload.main_id;
            state.landingsData.find(
                (landing) =>
                    landing._id === landing_id &&
                    landing.sections.find(
                        (section) =>
                            section._id === action.payload.section_id &&
                            (section.fields = action.payload.fields),
                    ),
            );
        },

        fieldUpdate: (state, action) => {
            const LANDING_ID = action.payload.main_id;
            state.landingsData.find(
                (landing) =>
                    landing._id === LANDING_ID &&
                    landing.sections.find(
                        (section) =>
                            section._id === action.payload.section_id &&
                            (section.fields = action.payload.fields),
                    ),
            );
        },

        fieldDelete: (state, action) => {
            state.landingsData.find(
                (landing) =>
                    landing._id === action.payload.landingId &&
                    landing.sections.find(
                        (section) =>
                            section._id === action.payload.sectionId &&
                            (section.fields = section.fields.filter(
                                (el) => el._id !== action.payload.fieldId,
                            )),
                    ),
            );
        },
        // ./FIELD

        // DRAG & DROP
        dragAndDrop: (state, action) => {
            state.landingsData.find(
                (landing) =>
                    landing._id === action.payload.landing_id &&
                    landing.sections.find(
                        (section) =>
                            section._id === action.payload.section_id &&
                            (section.fields = action.payload.fields),
                    ),
            );
        },
        // ./DRAG & DROP
    },
    extraReducers: (build) => {
        build
            .addCase(getLandings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLandings.fulfilled, (state, action) => {
                state.landingsData = action.payload;
                state.isLoading = false;
            })
            .addCase(getLandings.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default Landings.reducer;

export const {
    create,
    update,
    updateOne,
    remove,

    duplicateGroup,
    removeGroup,

    sectionCreate,
    sectionsUpdate,
    sectionsDelete,

    fieldCreate,
    fieldUpdate,
    fieldDelete,

    dragAndDrop,
} = Landings.actions;
