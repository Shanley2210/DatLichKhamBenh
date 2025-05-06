import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedLanguage: 'vi'
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
