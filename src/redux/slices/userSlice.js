import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { toast } from 'react-toastify';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (userId) => {
    try {
        const numericUserId = Number(userId);
        const res = await request({
            url: `/get-user/${numericUserId}`,
            method: 'get',
        });
        if (res.status === "success") {
            return res.user;
        }
        return "Something went wrong, not fetched data";
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
})

export const updateUserData = createAsyncThunk('user/updateUserData', async (updateUserData) => {
    try {
        const res = await request({
            url: `/update-user`,
            method: 'put',
            data: updateUserData
        });
        if (res.status === "success") {
            toast.success(res.message);
            return res.user;
        }
        toast.error(res.message || "Failed to update user data.");
        return "Something went wrong, not updated data";
    } catch (error) {
        console.error("Error updateing user data:", error);
        toast.error(error.errors[0].message || "Error updating user data.");
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "9xxxxxxxxx",
            recoveryEmail: "recovery@example.com"
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

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;