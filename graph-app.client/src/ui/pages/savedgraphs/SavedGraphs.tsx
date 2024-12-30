import { useContext, useEffect } from "react";
import { AuthContext } from "../../../domain/providers/AuthProvider";
import Layout from "../../components/utility/Layout"

import styles from "./savedGraph.module.scss"
import { Link } from "react-router-dom";

const SavedGraphs = () => {

    const { user, reFetchUser } = useContext(AuthContext)

    useEffect(()=>{
        reFetchUser()
    },[])

    return(
        <Layout>
            <div className={styles.gridWrap}>
                <div className={styles.titleWrap} >
                    <h3>Saved Graphs</h3>
                </div>

                <div className={styles.grid}>
                    {
                        (user !== null && user.graphs !== undefined && user.graphs !== null) ?(      
                            user.graphs.map( (graph : any, idx : number) => {
                                    return <GraphItem graph={graph} idx={idx} />
                                })
                        ): null
                    }
                </div>
            </div>
        </Layout>
    )
}

type GraphItemProps = {
    graph : any, 
    idx: number
}

const GraphItem = ({graph, idx} : GraphItemProps) => { 

    return(
        <Link 
            className={styles.gridItem}
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