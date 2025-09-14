import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/request";

export const fetchUserInfoData = createAsyncThunk('userInfo/fetchUserInfoData', async (userId) => {
    try {
        const numericUserId = Number(userId);
        const res =await request({
            url: `/get-user-info/${numericUserId}`,
            method: 'get',
        });
        if(res.status === "success"){
            return res.userInfo;
        }
        return "Something went wrong, not fetched data";
    } catch (error) {
        console.error("Error fetching user info data:", error);
    }
})

export const updateUserInfoData = createAsyncThunk('userInfo/updateUserInfoData', async (updateUserInfoData) => {
    try {
        const res =await request({
            url: `/update-user-info`,
            method: 'put',
            data: updateUserInfoData
        });
        if(res.status === "success"){
            return res.userInfo;
        }
        return "Something went wrong, not updated userInfoData data";
    } catch (error) {
        console.error("Error Updating user info data:", error);
    }
})


const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfoData: {
            // user_photo: "",
            dob: "YYYY-MM-DD",
            gender: "Not Specified",
            home_address: "Not Specified",
            work_address: "Not Specified"
        },
        loading: false,
        error: null,
    },
    reducers: {
        clearUserInfo: (state) => {
            state.userInfoData = {};
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfoData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfoData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.userInfoData = action.payload || {};
            })
            .addCase(fetchUserInfoData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user info data';
            })
    }
})

export const { clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

