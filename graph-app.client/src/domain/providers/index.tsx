
import AuthProvider from "./AuthProvider"
import { InputProvider } from "./InputProvider"
import { GraphProvider } from "./GraphProvider"
import { ClerkProvider } from '@clerk/react-router'
import { BrowserRouter } from "react-router-dom"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const Providers = ({children} : any) =>{

    return(
        <BrowserRouter>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                <AuthProvider>
                    <InputProvider> 
                        <GraphProvider>
                            {children}
                        </GraphProvider>
                    </InputProvider>
                </AuthProvider>
            </ClerkProvider>
        </BrowserRouter>
    )
}

export default Providers;