import { useContext } from "react";
import { useFetch } from "../../../domain/hooks/useFetch";
import Layout from "../../components/Layout"
import { AuthContext } from "../../../domain/providers/AuthProvider";

import "./savedGraph.scss"

const SavedGraphs = () => {

    // const {fetch, data} = useFetch()

    const {user} = useContext(AuthContext)

    // const test = [
    //     {title: "TEst1"},
    //     {title: "TEst2"},
    //     {title: "TEst3"},
    //     {title: "TEst4"},
    //     {title: "TEst1"},
    //     {title: "TEst2"},
    //     {title: "TEst3"},
    //     {title: "TEst4"}
    // ]

    // useEffect(()=>{
    //     async function fetchData(){
    //         await fetch()
    //     }
    //     fetchData()
    // },[fetch])

    return(
        <Layout>
            <div className="grid-wrap">
                <div className="grid">
                    {
                        (user !== null && user.graphs !== undefined) ?(
                          user.graphs !== null ? (
                                test.map( graph => {
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
            <p>{graph.title}</p>
        </div>
    )
}

export default SavedGraphs;