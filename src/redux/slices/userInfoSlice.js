import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserInfoData = createAsyncThunk('userInfo/fetchUserInfoData', async (userId) => {
    console.log("Fetching user info data for userId:", userId);
})

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfoData: {
            userPhoto: "defaultProfilePic.png",
            dob: "00-00-0000",
            gender: "Male",
            home_address: "Home Address",
            work_address: "Work Address"
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

