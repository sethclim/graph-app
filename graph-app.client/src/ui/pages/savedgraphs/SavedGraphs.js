import { useContext, useEffect } from "react";
import { useFetch } from "../../../domain/hooks/useFetch";
import Layout from "../../components/Layout"
import { AuthContext } from "../../../domain/providers/AuthProvider";

import "./savedGraph.scss"

const SavedGraphs = () => {

    const { user, reFetchUser } = useContext(AuthContext)

    useEffect(()=>{
        reFetchUser()
        console.log(JSON.stringify(user))
    })

    return(
        <Layout>
            <div className="grid-wrap">
                <div className="grid">
                    {
                        (user !== null && user.graphs !== undefined) ?(
                          user.graphs !== null ? (
                    
                            user.graphs.map( graph => {
                                    return <GraphItem graph={graph} />
                                })
                            ): null  
                        ): null
                    }
                </div>
            </div>
        </Layout>
    )
}

const GraphItem = ({graph}) => { 
    return(
        <div className="grid-item">
            <p>{graph.id.timestamp}</p>
        </div>
    )
}

export default SavedGraphs;