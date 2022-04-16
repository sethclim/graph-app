import { useContext, useEffect } from "react";
import "../scss/base.scss";
import "../scss/toplevel.scss";
import Graph from "../components/Graph";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainToolbar from "../components/MainToolbar";
import GraphControls from "../components/GraphControls";
import CogButton from "../components/CogButton";
import { useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {useHistory} from "react-router-dom"


const Home = () =>{

    const {authenticated} = useContext(AuthContext)
    const [controls, setControls] = useState()

    const history = useHistory()

    const handleControls = () =>{
        setControls(!controls)
    }
    useEffect(()=>{
        if(authenticated)
            history.push("/home")
    },[authenticated, history])
    
    
    return(
       <div className="App" id="top-grid">
            <div id="trackarea" ></div>
            <Header className="header" />
                <div className="content container"  >
                
                    <MainToolbar />
                    <Graph />
                    <CogButton onClick={handleControls}  />

                    {
                        controls?   <GraphControls /> : null
                    }
            
                </div>
            <Footer className="footer" />
        </div>    
    )
}

export default Home;