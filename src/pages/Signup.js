import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from 'react-router-dom';
import Layout from "../components/Layout";
import "../scss/signin.scss";


const Signup = ()=>{
    const {Signup, signupSuccess} = useContext(AuthContext)
    const history = useHistory();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();


    useEffect(()=>{
        if(signupSuccess)
            history.push("/login")
    },[signupSuccess, history])

    const submit = () => {
        const signupDto = {
            "name" : name,
            "email" : email,
            "password" : password,
            "passwordConfirm" : passwordConfirm
        }
        Signup(signupDto)
    }

    return(
        <Layout>
            <div className="signinPage">
                <div className="signinWrap"> 
                    <div class="form__group field">
                        <label for="name" class="form__label">Name</label>
                        <input onChange={(e) =>setName(e.target.value)} type="input" class="form__field" placeholder="Name" name="name" id='name' required /> 
                    </div>
                    <div class="form__group field">
                        <label for="email" class="form__label">Email</label>
                        <input onChange={(e) =>setEmail(e.target.value)} type="input" class="form__field" placeholder="Email" name="email" id='email' required />
                    </div>
                    <div class="form__group field">
                        <label for="password" class="form__label">Password</label>
                        <input onChange={(e) =>setPassword(e.target.value)} type="input" class="form__field" placeholder="Password" name="password" id='password' required />
                    </div>
                    <div class="form__group field">
                        <label for="passwordconfirm" class="form__label">Password Confirm</label>
                        <input onChange={(e) =>setPasswordConfirm(e.target.value)} type="input" class="form__field" placeholder="Confirm Password" name="passwordconfirm" id='passwordconfirm' required />
                    </div>
                    <button className="button" onClick={() =>submit()}>Submit</button>
                </div>
            </div>
        </Layout>
    )
}

export default Signup;