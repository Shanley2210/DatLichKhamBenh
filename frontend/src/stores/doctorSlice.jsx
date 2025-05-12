import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { topDoctorsHome } from '@services/doctorService';
import { handleAsyncThunk } from '@utils/reduxHelpers';

export const fetchTopDoctorsHome = createAsyncThunk(
    'doctor/fetchTopDoctorsHome',
    async (limit, thunkAPI) => {
        try {
            const res = await topDoctorsHome(limit);

            if (res && res.data.errCode === 0) {
                return res.data.data;
            } else {
                return thunkAPI.rejectWithValue(res.data.errMessage);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        topDoctorsHome: []
    },
    reducers: {
        clearTopDoctorsHome: (state) => {
            state.topDoctorsHome = [];
        }
    },
    extraReducers: (builder) => {
        handleAsyncThunk(builder, fetchTopDoctorsHome, 'topDoctorsHome');
    }
});

export const { clearTopDoctorsHome } = doctorSlice.actions;
export default doctorSlice.reducer;
