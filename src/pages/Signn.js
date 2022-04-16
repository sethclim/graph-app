import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from 'react-router-dom';

import "../scss/signin.scss";

const SignIn = ()=>{


    const {startTracking, stopTracking, authenticated, setUserName} = useContext(AuthContext)
    const history = useHistory();

    const submit = () =>{
        stopTracking()
    }


    useEffect(()=>{
        if(authenticated)
            history.push("/home")
    },[authenticated, history])

    return(
        <div>

            <div id="trackarea" onMouseEnter={() => startTracking()} >
                <input onChange={(e) =>setUserName(e.target.value)} />
                <button onClick={() =>submit()} >Submit</button>
            </div>

        </div>
    )
}

export default SignIn;