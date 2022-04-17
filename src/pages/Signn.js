import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../scss/signin.scss";


const SignIn = ()=>{

    const [name, setName] = useState();
    const {startTracking, loginProfile, authenticated, setUserName} = useContext(AuthContext)
    const history = useHistory();

    const submit = () =>{
        loginProfile(name)
    }


    useEffect(()=>{
        if(authenticated)
            history.push("/home")
    },[authenticated, history])

    return(
        <div className="App" id="top-grid">
         <Header />
            <div className="signinWrap">
               
                <div id="trackarea" onMouseEnter={() => startTracking()} >
                <div class="form__group field">
                    <input onChange={(e) =>setName(e.target.value)} type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                    <label for="name" class="form__label">Name</label>
                </div>
                
                    <button className="button" onClick={() =>submit()} >Submit</button>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default SignIn;