import { createSlice } from "@reduxjs/toolkit";

const loginUserSlice = createSlice({
    name:'loginUser',
    initialState:{
        loginUserData:{},
        loading:false,
        error:null,
    },
    reducers:{
        clearLoginUser:(state)=>{
            state.loginUserData={};
            state.loading=false;
            state.error=null;
        },
        setLoginUser:(state, action)=>{
            state.loginUserData=action.payload;
            state.loading=false;
            state.error=null;
        }
    }
})

export const {clearLoginUser, setLoginUser} = loginUserSlice.actions;
export default loginUserSlice.reducer;