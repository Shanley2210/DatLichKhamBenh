export const handleAsyncThunk = (builder, thunk, key) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state.loading = false;
            state[key] = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || `Error fetching ${key}`;
        });
};

export const handleAsyncThunkNoPayload = (builder, thunk, key) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(thunk.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(thunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || `Error ${key}`;
        });
};
