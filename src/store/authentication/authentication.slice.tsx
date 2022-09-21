import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isActive: false,
    },
    reducers: {
        handlerAuth: (state, action) => {
            state.isActive = !state.isActive;
        },
    },
});

export default authSlice.reducer;
export const { handlerAuth } = authSlice.actions;
