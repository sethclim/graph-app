import {createContext, useEffect, useState} from "react";
import { EndPoints } from "../constants/EndPoints";
import { usePost } from "../hooks/usePost";

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState();

    const {send : login, success : loginSuccess } = usePost(EndPoints.login);
    const {send : signup, success : signupSuccess } = usePost(EndPoints.signup);

    useEffect(()=>{
        console.log("Login Success " + JSON.stringify(loginSuccess))
        //setAuthenticated(true)
        //setToken(loginSuccess.token)
    },[loginSuccess])

    const value = {
        login,
        signup,
        loginSuccess,
        signupSuccess,
        authenticated,
        token
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;