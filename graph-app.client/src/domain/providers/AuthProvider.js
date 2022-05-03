import { createContext, useEffect, useState, useCallback } from "react";
import { EndPoints } from "../constants/EndPoints";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState();

    const { send: login, success: loginSuccess } = usePost(EndPoints.login);
    const { send: signup, success: signupSuccess } = usePost(EndPoints.signup);
    const { fetch, data: user, error } = useFetch(EndPoints.getUser);

    const getUserCallBack = useCallback(() => {
        if(loginSuccess !== undefined && loginSuccess.token !== undefined){
            (async function () {
                await fetch(loginSuccess.token)
            })()
        }
      }, [loginSuccess]);

    useEffect(() => {
        if (loginSuccess !== undefined && loginSuccess.token !== undefined) {
            console.log("Login Success")
            setAuthenticated(true)
            getUserCallBack()
        }
    }, [getUserCallBack, loginSuccess])

    const value = {
        login,
        signup,
        loginSuccess,
        signupSuccess,
        authenticated,
        token,
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;