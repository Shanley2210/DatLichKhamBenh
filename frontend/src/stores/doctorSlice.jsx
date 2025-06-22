import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    allDoctors,
    createMedicalAppointmentPlan,
    getDetailDoctor,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    getScheduleByDate,
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
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

export const fetchDetailInfoDoctor = createAsyncThunk(
    'doctor/fetchDetailInfoDoctor',
    async (id, thunkAPI) => {
        try {
            const res = await getDetailDoctor(id);

            return res.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

export const fetchMedicalAppointmentPlan = createAsyncThunk(
    'doctor/fetchMedicalAppointmentPlan',
    async (data, thunkAPI) => {
        try {
            const res = await createMedicalAppointmentPlan(data);

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

export const fetchScheduleByDate = createAsyncThunk(
    'doctor/fetchScheduleByDate',
    async ({ doctorId, date }, thunkAPI) => {
        try {
            const res = await getScheduleByDate(doctorId, date);

            if (res && res.data.errCode === 0) {
                return res.data.data;
            } else if (res && res.data.errCode === 2) {
                return null;
            } else {
                return thunkAPI.rejectWithValue(res.data.errMessage);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

export const fetchExtraInfoDoctor = createAsyncThunk(
    'doctor/fetchExtraInfoDoctor',
    async (id, thunkAPI) => {
        try {
            const res = await getExtraInfoDoctorById(id);

            if (res && res.data.errCode === 0) {
                return res.data.data;
            } else {
                return thunkAPI.rejectWithValue(res.data.errMessage);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

export const fetchProfileDoctor = createAsyncThunk(
    'doctor/fetchProfileDoctor',
    async (id, thunkAPI) => {
        try {
            const res = await getProfileDoctorById(id);

            if (res && res.data.errCode === 0) {
                return res.data.data;
            } else {
                return thunkAPI.rejectWithValue(res.data.errMessage);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        topDoctorsHome: [],
        allDoctors: [],
        detailInfo: null,
        schedule: [],
        extraInfo: null,
        profileDoctor: []
    },
    reducers: {
        clearTopDoctorsHome: (state) => {
            state.topDoctorsHome = [];
        }
    },
    extraReducers: (builder) => {
        handleAsyncThunk(builder, fetchTopDoctorsHome, 'topDoctorsHome');
        handleAsyncThunk(builder, fetchAllDoctors, 'allDoctors');
        handleAsyncThunk(builder, fetchDetailInfoDoctor, 'detailInfo');
        handleAsyncThunk(builder, fetchScheduleByDate, 'schedule');
        handleAsyncThunk(builder, fetchExtraInfoDoctor, 'extraInfo');
        handleAsyncThunk(builder, fetchProfileDoctor, 'profileDoctor');

        handleAsyncThunkNoPayload(
            builder,
            fetchSaveDetailInfoDoctor,
            'saveDetailInfoDoctor'
        );
        handleAsyncThunkNoPayload(
            builder,
            fetchMedicalAppointmentPlan,
            'medicalAppointmentPlan'
        );
    }
});

export const { clearTopDoctorsHome } = doctorSlice.actions;
export default doctorSlice.reducer;
