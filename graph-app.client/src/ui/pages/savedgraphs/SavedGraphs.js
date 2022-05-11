import { useContext, useEffect } from "react";
import { AuthContext } from "../../../domain/providers/AuthProvider";
import Layout from "../../components/utility/Layout"

import {gridWrap, grid, titleWrap, gridItem, } from "./savedGraph.module.scss"
import { Link } from "react-router-dom";

const SavedGraphs = () => {

    const { user, reFetchUser } = useContext(AuthContext)

    useEffect(()=>{
        reFetchUser()
    },[])

    return(
        <Layout>
            <div className={gridWrap}>
                <div className={titleWrap} >
                    <h3>Saved Graphs</h3>
                </div>

                <div className={grid}>
                    {
                        (user !== null && user.graphs !== undefined && user.graphs !== null) ?(      
                            user.graphs.map( (graph, idx) => {
                                    return <GraphItem graph={graph} idx={idx} />
                                })
                        ): null
                    }
                </div>
            </div>
        </Layout>
    )
}

const GraphItem = ({graph, idx}) => { 

    return(
        <Link 
            className={gridItem}
            to={{
                pathname: "/home",
                state: { fromSavedGraph: idx }
            }}
         >
            <div>
                <h2>Name</h2>
                <p>{graph.id.timestamp}</p>
            </div>
           
        </Link>
    )
}

export default SavedGraphs;