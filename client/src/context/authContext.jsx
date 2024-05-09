import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

// for wrapping the <App />
const AuthContextProvider = ({ children }) => {
    //we will save logged in user in localstorage, put these two var here and will be used in authentication pages
    //authentication will based on authUser state
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('loginUser')) || null); //init with null
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;

}

export { AuthContext, useAuthContext, AuthContextProvider };