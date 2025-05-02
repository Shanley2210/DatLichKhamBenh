import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedLanguage: localStorage.getItem('i18nextLng') || 'vi'
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
            localStorage.setItem('i18nextLng', action.payload);
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
