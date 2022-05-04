import { useContext, useEffect } from "react";
import Layout from "../../components/utility/Layout"
import { AuthContext } from "../../../domain/providers/AuthProvider";

import "./savedGraph.scss"
import { Link } from "react-router-dom";

const SavedGraphs = () => {

    const { user, reFetchUser } = useContext(AuthContext)

    useEffect(()=>{
        reFetchUser()
    },[])

    return(
        <Layout>
            <div className="grid-wrap">
                <div className="grid">
                    {
                        (user !== null && user.graphs !== undefined) ?(
                          user.graphs !== null ? (
                    
                            user.graphs.map( (graph, idx) => {
                                    return <GraphItem graph={graph} idx={idx} />
                                })
                            ): null  
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
            className="grid-item" 
            to={{
                pathname: "/home",
                state: { fromSavedGraph: idx }
            }}
         >
            <p>{graph.id.timestamp}</p>
        </Link>
    )
}

export default SavedGraphs;