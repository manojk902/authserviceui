import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (userId) => {
    try {
            const numericUserId = Number(userId);
            const res = await request({
                url: `/get-user/${numericUserId}`,
                method: 'get',
            });
            if(res.status === "success"){
                return res.user;
            }
            return "Something went wrong, not fetched data";
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {
            username: "Demo",
            firstName: "John",
            lastName: "Doe",
            email: "John@example.com",
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