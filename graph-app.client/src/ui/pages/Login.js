import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../domain/providers/AuthProvider";
import { useHistory } from 'react-router-dom';
import "../scss/signin.scss";
import Layout from "../components/utility/Layout";

const Login = ()=>{
    const {login, authenticated} = useContext(AuthContext)
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    useEffect(()=>{
        if(authenticated)
            history.push("/home")
    },[authenticated, history])

    const submit = () => {
        const loginDto = {
            "email" : email,
            "password" : password,
        }
        login(loginDto)
    }

    return(
        <Layout>
            <div className="signinPage">
                <div className="signinWrap"> 
                    <div className="form__group field">
                         <input onChange={(e) =>setEmail(e.target.value)} type="input" className="form__field" placeholder="Email" name="email" id='email' required />
                         <label htmlFor="email" className="form__label">Email</label>
                    </div>
                    <div className="form__group field">
                        <input onChange={(e) =>setPassword(e.target.value)} type="input" className="form__field" placeholder="Password" name="password" id='password' required />
                        <label htmlFor="password" className="form__label">Password</label>
                    </div>
                    <button className="button" onClick={() =>submit()}>Submit</button>
                </div>
            </div>
        </Layout>
    )
}

export default Login;