import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../domain/providers/AuthProvider";
import { useNavigate } from 'react-router-dom';
import Layout from "../components/utility/Layout";
import "../scss/signin.scss";


const Signup = ()=>{
    const {signup, signupSuccess} = useContext(AuthContext)
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    useEffect(()=>{
        if(signupSuccess)
            navigate("/login")
    },[signupSuccess, history])

    const submit = () => {
        const signupDto = {
            "name" : name,
            "email" : email,
            "password" : password,
            "passwordConfirm" : passwordConfirm
        }
        signup(signupDto)
    }

    return(
        <Layout>
            <div className="signinPage">
                <div className="signinWrap"> 
                    <div class="form__group field">
                        <input onChange={(e) =>setName(e.target.value)} type="input" class="form__field" placeholder="Name" name="name" id='name' required /> 
                        <label for="name" class="form__label">Name</label>
                    </div>
                    <div class="form__group field">
                        <input onChange={(e) =>setEmail(e.target.value)} type="input" class="form__field" placeholder="Email" name="email" id='email' required />
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <div class="form__group field">
                        <input onChange={(e) =>setPassword(e.target.value)} type="input" class="form__field" placeholder="Password" name="password" id='password' required />
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <div class="form__group field">
                        <input onChange={(e) =>setPasswordConfirm(e.target.value)} type="input" class="form__field" placeholder="Confirm Password" name="passwordconfirm" id='passwordconfirm' required />
                        <label for="passwordconfirm" class="form__label">Password Confirm</label>
                    </div>
                    <button className="button" onClick={() =>submit()}>Submit</button>
                </div>
            </div>
        </Layout>
    )
}

export default Signup;