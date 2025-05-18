import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    allDoctors,
    saveDoctorInfo,
    topDoctorsHome
} from '@services/doctorService';
import {
    handleAsyncThunk,
    handleAsyncThunkNoPayload
} from '@utils/reduxHelpers';

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

export const fetchAllDoctors = createAsyncThunk(
    'doctor/fetchAllDoctors',
    async (_, thunkAPI) => {
        try {
            const res = await allDoctors();

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

export const fetchSaveDetailInfoDoctor = createAsyncThunk(
    'doctor/fetchSaveDetailInfoDoctor',
    async (data, thunkAPI) => {
        try {
            const res = await saveDoctorInfo(data);

            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        topDoctorsHome: [],
        allDoctors: []
    },
    reducers: {
        clearTopDoctorsHome: (state) => {
            state.topDoctorsHome = [];
        }
    },
    extraReducers: (builder) => {
        handleAsyncThunk(builder, fetchTopDoctorsHome, 'topDoctorsHome');
        handleAsyncThunk(builder, fetchAllDoctors, 'allDoctors');

        handleAsyncThunkNoPayload(
            builder,
            fetchSaveDetailInfoDoctor,
            'saveDetailInfoDoctor'
        );
    }
});

export const { clearTopDoctorsHome } = doctorSlice.actions;
export default doctorSlice.reducer;
