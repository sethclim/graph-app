
import AuthProvider from "./AuthProvider"
import { InputProvider } from "./InputProvider"
import { GraphProvider } from "./GraphProvider"

const Providers = ({children}) =>{

    return(
        <AuthProvider>
            <InputProvider> 
                <GraphProvider>
                    {children}
                </GraphProvider>
            </InputProvider>
        </AuthProvider>
    )
}

export default Providers;