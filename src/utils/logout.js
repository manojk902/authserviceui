import { clearLoginUser } from "../redux/slices/loginUserSlice";
import { clearUserInfo } from "../redux/slices/userInfoSlice";
import { clearUser } from "../redux/slices/userSlice";
import { persistor, store } from "../redux/store";

export const logout = ()=>{
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("appName");
    localStorage.removeItem("redirectUrl");
    persistor.purge();
    store.dispatch(clearLoginUser()); 
    store.dispatch(clearUser()); 
    store.dispatch(clearUserInfo()); 
    window.location.href = "/login";
}