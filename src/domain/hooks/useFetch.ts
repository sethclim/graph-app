import { useState } from "react"
import axios from "axios";

export const useFetch = (url : string) =>{
    
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState<boolean>();
    const [data, setData] = useState<any>();

    const fetch = async (data : JSON) => {
        try{
            setLoading(true)
            const response = await axios.get(url)
            setData(response.data)
        }
        catch(err){
            setError(err)
        }
        finally{
            setLoading(false)
        }
    }

    return {fetch, data, loading, error}
}