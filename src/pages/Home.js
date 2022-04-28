import { useContext, useEffect } from "react";
import "../scss/base.scss";
import "../scss/toplevel.scss";
import Graph from "../components/Graph";
import MainToolbar from "../components/MainToolbar";
import GraphControls from "../components/GraphControls";
import CogButton from "../components/CogButton";
import { useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {useHistory} from "react-router-dom"
import Layout from "../components/Layout";


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
        <Layout>
            <div className="content container"  >
                <MainToolbar />
                <Graph />
                <CogButton onClick={handleControls}  />

                {
                    controls?   <GraphControls /> : null
                }
            </div>
        </Layout>
    )
}

export default Home;