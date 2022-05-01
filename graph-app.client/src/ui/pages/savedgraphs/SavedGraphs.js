import { useEffect } from "react";
import { useFetch } from "../../../domain/hooks/useFetch";
import Layout from "../../components/Layout"

import "./savedGraph.scss"

const SavedGraphs = () => {

    // const {get, data} = useFetch()

    const test = [
        {title: "TEst1"},
        {title: "TEst2"},
        {title: "TEst3"},
        {title: "TEst4"},
        {title: "TEst1"},
        {title: "TEst2"},
        {title: "TEst3"},
        {title: "TEst4"}
    ]

    // useEffect(()=>{
    //     get()
    // },[get])

    return(
        <Layout>
        <div className="grid-wrap">
            <div className="grid">
                {
                    test.map( graph => {
                        {console.log(graph.title)}
                        return <GraphItem graph={graph} />
                    })
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