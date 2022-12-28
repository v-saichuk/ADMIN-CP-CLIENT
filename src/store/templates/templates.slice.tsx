import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ITemplates } from '../../types';

interface IInitialState {
    TemplatesData: ITemplates[];
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

const initialState: IInitialState = {
    isLoading: false,
    isLoadingSection: false,
    TemplatesData: [],
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
            state.TemplatesData = action.payload;
        },
        removeGroup: (state, action) => {
            action.payload.map(
                (siteID: string) =>
                    (state.TemplatesData = state.TemplatesData.filter(
                        (legal) => legal._id !== siteID,
                    )),
            );
        },

        // SECTIONS
        sectionCreate: (state, action) => {
            state.TemplatesData.find(
                (template) =>
                    template._id === action.payload.templateId &&
                    (template.sections = action.payload.sections),
            );
        },
        sectionsUpdate: (state, action) => {
            state.TemplatesData.find(
                (template) =>
                    template._id === action.payload.templateId &&
                    template.sections.find(
                        (section) =>
                            section._id === action.payload.sectionId &&
                            (section.title = action.payload.title),
                    ),
            );
        },
        sectionsDelete: (state, action) => {
            state.TemplatesData.find(
                (template) =>
                    template._id === action.payload.templateId &&
                    (template.sections = template.sections.filter(
                        (section) => section._id !== action.payload.sectionId,
                    )),
            );
        },
        // ./SECTIONS

        // FIELD
        fieldCreate: (state, action) => {
            state.TemplatesData.find(
                (template) =>
                    template._id === action.payload.templateId &&
                    template.sections.find(
                        (section) =>
                            section._id === action.payload.sectionId &&
                            (section.fields = action.payload.fields),
                    ),
            );
        },

        fieldUpdate: (state, action) => {
            switch (action.payload.fieldType) {
                case 'text':
                    console.log('Text = _ =');
                    break;

                case 'rich_text':
                    console.log('Rich Text');
                    break;

                default:
                    break;
            }

            state.TemplatesData.find(
                (template) =>
                    template._id === action.payload.templateId &&
                    template.sections.find(
                        (section) =>
                            section._id === action.payload.sectionId &&
                            (section.fields = section.fields.filter(
                                (el) => el._id !== action.payload.fieldId,
                            )),
                    ),
            );
        },

        fieldDelete: (state, action) => {
            state.TemplatesData.find(
                (template) =>
                    template._id === action.payload.templateId &&
                    template.sections.find(
                        (section) =>
                            section._id === action.payload.sectionId &&
                            (section.fields = section.fields.filter(
                                (el) => el._id !== action.payload.fieldId,
                            )),
                    ),
            );
        },
        // ./FIELD
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
            });
    },
});

export default Templates.reducer;

export const {
    create,
    remove,
    update,
    updateOne,
    duplicateGroup,
    removeGroup,
    sectionCreate,
    sectionsUpdate,
    sectionsDelete,
    fieldCreate,
    fieldUpdate,
    fieldDelete,
} = Templates.actions;
