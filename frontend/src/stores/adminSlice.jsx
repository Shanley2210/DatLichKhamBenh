import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCodes } from '@services/adminService';
import {
    addNewUser,
    deleteUser,
    getAllUser,
    updateUser
} from '@services/userService';
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

export const fetchTime = createAsyncThunk(
    'admin/fetchTime',
    async (_, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await getAllCodes('time', token);

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

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await getAllUser('ALL');

            if (res && res.data.errCode === 0) {
                return res.data;
            } else {
                return thunkAPI.rejectWithValue(res.data.errMessage);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

export const deleteAUser = createAsyncThunk(
    'admin/deleteUser',
    async (id, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await deleteUser(id);

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

export const updateAUser = createAsyncThunk(
    'admin/fectchUpdateUser',
    async (data, thunkAPI) => {
        try {
            const token = Cookies.get('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Invalid token');
            }

            const res = await updateUser(data);

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
        time: [],
        user: [],
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
        },
        clearUser: (state) => {
            state.user = [];
        }
    },
    extraReducers: (builder) => {
        handleAsyncThunk(builder, fetchGender, 'genders');
        handleAsyncThunk(builder, fetchRoles, 'roles');
        handleAsyncThunk(builder, fetchPosititions, 'posititions');
        handleAsyncThunk(builder, fetchTime, 'time');

        handleAsyncThunkNoPayload(builder, createNewUser, 'createNewUser');
        handleAsyncThunk(builder, fetchAllUsers, 'user');
        handleAsyncThunkNoPayload(builder, deleteAUser, 'deleteUser');
        handleAsyncThunkNoPayload(builder, updateAUser, 'updateUser');
    }
});

export const { clearGender, clearRoles, clearPosititions, clearUser } =
    adminSlide.actions;
export default adminSlide.reducer;
