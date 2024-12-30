import { useContext, useEffect } from "react";
import "../scss/base.scss";
import "../scss/toplevel.scss";
import Graph from "../components/Graph/Graph";
import MainToolbar from "../components/MainToolbar/MainToolbar";
import GraphControls from "../components/GraphControls/GraphControls";
import CogButton from "../components/Cogbutton/CogButton";
import { useState } from "react";
import { AuthContext } from "../../domain/providers/AuthProvider";
import { InputContext } from "../../domain/providers/InputProvider";
import Layout from "../components/utility/Layout";


const Home = () =>{
    const [controls, setControls] = useState()
    const [graphIndex, setGraphIndex] = useState(null) 
    
    const { user } = useContext(AuthContext)
    const { loadGraph } = useContext(InputContext);


    const handleControls = () =>{
        setControls(!controls)
    }
    // useEffect(()=>{

    //     if(location.state === undefined || location.state.fromSavedGraph === undefined)
    //        return

    //     setGraphIndex(location.state.fromSavedGraph)
           
    // },[location.state])


    useEffect(()=>{

        if(graphIndex === undefined || graphIndex === null || user == null || user.graphs === undefined || user.graphs === null )
            return

        const graph = user.graphs[graphIndex]
        loadGraph(graph)

    },[graphIndex, user])
    
    
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