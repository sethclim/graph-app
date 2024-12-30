import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { PropsWithChildren } from "react";

const Layout = ({children} : PropsWithChildren) =>{

    return(
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
}

export default Layout;