import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '@services/userService';
import Cookies from 'js-cookie';

export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (_, thunkAPI) => {
        const token = Cookies.get('token');

        if (!token) {
            return thunkAPI.rejectWithValue('Invalid token');
        }

        try {
            const res = await getUserInfo(token);
            return res.data.userData;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || 'Undefined error');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null
    },
    reducers: {
        clearUserInfo: (state) => {
            state.userInfo = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching user info';
            });
    }
});

export const { clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
