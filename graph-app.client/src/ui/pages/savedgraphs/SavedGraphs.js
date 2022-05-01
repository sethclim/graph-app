import { useEffect } from "react";
import { useFetch } from "../../../domain/hooks/useFetch";
import Layout from "../../components/Layout"

const SavedGraphs = () => {

    const {get, data} = useFetch()

    useEffect(()=>{
        get()
    },[get])

    return(
        <Layout>
            <div className="grid">
                {
                    data.map( graph => {
                        <GraphItem graph={graph} />
                    })
                }
            </div>
        </Layout>
    )
}

const GraphItem = ({graph}) => { 
    return(
        <div>
            <p>{graph.title}</p>
        </div>
    )
}

export default SavedGraphs;