import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCodes } from '@services/adminService';
import { addNewUser } from '@services/userService';
import {
    handleAsyncThunk,
    handleAsyncThunkNoPayload
} from '@utils/reduxHelpers';
import Cookies from 'js-cookie';

export const fetchGender = createAsyncThunk(
    'admin/fetchGender',
    async (_, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await getAllCodes('gender', token);

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

export const fetchRoles = createAsyncThunk(
    'admin/fetchRoles',
    async (_, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await getAllCodes('role', token);

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

export const fetchPosititions = createAsyncThunk(
    'admin/fetchPosititions',
    async (_, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await getAllCodes('position', token);

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

export const createNewUser = createAsyncThunk(
    'admin/createNewUser',
    async (data, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await addNewUser(data, token);

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

const adminSlide = createSlice({
    name: 'admin',
    initialState: {
        genders: [],
        roles: [],
        posititions: [],
        loading: false,
        error: null
    },
    reducers: {
        clearGender: (state) => {
            state.genders = [];
        },
        clearRoles: (state) => {
            state.roles = [];
        },
        clearPosititions: (state) => {
            state.posititions = [];
        }
    },
    extraReducers: (builder) => {
        handleAsyncThunk(builder, fetchGender, 'genders');
        handleAsyncThunk(builder, fetchRoles, 'roles');
        handleAsyncThunk(builder, fetchPosititions, 'posititions');

        handleAsyncThunkNoPayload(builder, createNewUser, 'createNewUser');
    }
});

export const { clearGender, clearRoles, clearPosititions } = adminSlide.actions;
export default adminSlide.reducer;
