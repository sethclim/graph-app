import { useState } from "react"
import axios from "axios";

export const usePost = (url : string) =>{
    
    const [error, setError] = useState<unknown>();
    const [sending, setSending] = useState<boolean>();
    const [success, setSuccess] = useState<any>();


    const send = async (data : JSON) =>{
        try{
            setSending(true)
            console.log("Sending...")
            const response = await axios.post(url, data, {
                headers: {
                  // 'application/json' is the modern content-type for JSON, but some
                  // older servers may use 'text/json'.
                  // See: http://bit.ly/text-json
                  'content-type': 'application/json'
                }
              })
            setSuccess(response.data)
        }
        catch(err){
            setError(err)
        }
        finally{
            setSending(false)
        }
    }

    return {send, success, sending, error}
}