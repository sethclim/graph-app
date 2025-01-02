// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../domain/providers/AuthProvider";
// import { useNavigate } from 'react-router-dom';
import Layout from "../components/utility/Layout";
import { SignUp, useUser } from '@clerk/react-router'
import "../scss/signin.scss";


const Signup = () => {
    const { user } = useUser()
    // const {signup, signupSuccess} = useContext(AuthContext)
    // const navigate = useNavigate();

    // const [name, setName] = useState<string>();
    // const [email, setEmail] = useState<string>();
    // const [password, setPassword] = useState<string>();
    // const [passwordConfirm, setPasswordConfirm] = useState<string>();

    // useEffect(()=>{
    //     if(signupSuccess)
    //         navigate("/login")
    // },[signupSuccess, history])

    // const submit = () => {
    //     const signupDto = {
    //         "name" : name,
    //         "email" : email,
    //         "password" : password,
    //         "passwordConfirm" : passwordConfirm
    //     }
    //     signup(signupDto)
    // }

    return(
        <Layout>
            <div className="signinPage">
                <div className="signinWrap"> 
                    {/* <div className="form__group field">
                        <input onChange={(e) =>setName(e.target.value)} type="input" className="form__field" placeholder="Name" name="name" id='name' required /> 
                        <label htmlFor="name" className="form__label">Name</label>
                    </div>
                    <div className="form__group field">
                        <input onChange={(e) =>setEmail(e.target.value)} type="input" className="form__field" placeholder="Email" name="email" id='email' required />
                        <label htmlFor="email" className="form__label">Email</label>
                    </div>
                    <div className="form__group field">
                        <input onChange={(e) =>setPassword(e.target.value)} type="input" className="form__field" placeholder="Password" name="password" id='password' required />
                        <label htmlFor="password" className="form__label">Password</label>
                    </div>
                    <div className="form__group field">
                        <input onChange={(e) =>setPasswordConfirm(e.target.value)} type="input" className="form__field" placeholder="Confirm Password" name="passwordconfirm" id='passwordconfirm' required />
                        <label htmlFor="passwordconfirm" className="form__label">Password Confirm</label>
                    </div>
                    <button className="button" onClick={() =>submit()}>Submit</button> */}
                    {
                        !user ? <SignUp signInUrl="/login" /> : null
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Signup;