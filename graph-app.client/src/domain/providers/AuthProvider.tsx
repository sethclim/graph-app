import { createContext, useEffect, useState, useCallback, PropsWithChildren } from "react";
import { EndPoints } from "../constants/EndPoints";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";

export interface IAuthContext   {
    login : Function
    signup : Function
    loginSuccess : boolean
    signupSuccess : any
    authenticated: boolean,
    token: undefined,
    setToken: Function
    user : any,
    reFetchUser : Function
}

const defaultAuthContext = {
    login : () => null,
    signup  : () => null,
    loginSuccess : false,
    signupSuccess : null,
    authenticated: false,
    token: undefined,
    setToken  : () => null,
    user : null,
    reFetchUser  : () => null,
}

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

const AuthProvider = (props : PropsWithChildren<any> )=> {
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(); 

    const { send: login, success: loginSuccess } = usePost(EndPoints.login);
    const { send: signup, success: signupSuccess } = usePost(EndPoints.signup);
    const { fetch, data: user } = useFetch(EndPoints.getUser);

    const getUserCallBack = useCallback(() => {
        console.log("getUserCallBack")
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

    const reFetchUser = () =>{
        console.log("reFetch user")
        getUserCallBack()
    }

    const value : IAuthContext = {
        login,
        signup,
        loginSuccess,
        signupSuccess,
        authenticated,
        token,
        setToken,
        user,
        reFetchUser
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;