export const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("appName");
    localStorage.removeItem("redirectUrl");
    window.location.href = "/login";
}