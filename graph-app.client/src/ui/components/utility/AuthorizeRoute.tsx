
import  { PropsWithChildren, useContext } from 'react'
import { Navigate  } from 'react-router-dom'

import { AuthContext } from '../../../domain/providers/AuthProvider'

type IAuthorizeRouteProps = {
    redirectPath : string
}

const AuthorizeRoute = ({ children, redirectPath = "/"} : PropsWithChildren<IAuthorizeRouteProps>) => {

    const { authenticated } = useContext(AuthContext)

    return authenticated ? children :  <Navigate  to={redirectPath} />

}

export default AuthorizeRoute;