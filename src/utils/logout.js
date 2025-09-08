import { clearLoginUser } from "../redux/slices/loginUserSlice";
import { persistor, store } from "../redux/store";

export const logout = ()=>{
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("appName");
    localStorage.removeItem("redirectUrl");
    persistor.purge();
    store.dispatch(clearLoginUser()); 
    window.location.href = "/login";
}