import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (userId) => {
    console.log("Fetching user data for userId:", userId);
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {
            userName: "Mukesh_111",
            firstName: "Mukesh",
            lastName: "Kumar",
            email: "mkmk@example.com",
            phoneNumber: "1234567890",
            recoveryEmail: "recoveryEmail@example.com"
        },
        loading: false,
        error: null,
    },
    reducers: {
        clearUser: (state) => {
            state.userData = {};
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.userData = action.payload || {};
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user data';
            })
    }
})

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;