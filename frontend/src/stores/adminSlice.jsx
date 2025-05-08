import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCodes } from '@services/adminService';
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
        builder

            // gender
            .addCase(fetchGender.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGender.fulfilled, (state, action) => {
                state.loading = false;
                state.genders = action.payload;
            })
            .addCase(fetchGender.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching gender';
            })

            // roles
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching roles';
            })

            // posititions
            .addCase(fetchPosititions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosititions.fulfilled, (state, action) => {
                state.loading = false;
                state.posititions = action.payload;
            })
            .addCase(fetchPosititions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching posititions';
            });
    }
});

export const { clearGender, clearRoles, clearPosititions } = adminSlide.actions;
export default adminSlide.reducer;
