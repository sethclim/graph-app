import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from 'react-router-dom';
import "../scss/signin.scss";
import Layout from "../components/Layout";

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
                    <div class="form__group field">
                         <input onChange={(e) =>setEmail(e.target.value)} type="input" class="form__field" placeholder="Email" name="email" id='email' required />
                         <label for="email" class="form__label">Email</label>
                    </div>
                    <div class="form__group field">
                        <input onChange={(e) =>setPassword(e.target.value)} type="input" class="form__field" placeholder="Password" name="password" id='password' required />
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <button className="button" onClick={() =>submit()}>Submit</button>
                </div>
            </div>
        </Layout>
    )
}

export default Login;