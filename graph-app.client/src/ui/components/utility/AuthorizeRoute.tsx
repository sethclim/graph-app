
import  { useContext } from 'react'
import { Route, Navigate  } from 'react-router-dom'

import { AuthContext } from '../../../domain/providers/AuthProvider'

const AuthorizeRoute = ({ children, redirectPath = "/", ...rest }) => {

    const { authenticated } = useContext(AuthContext)

    return authenticated ? children :  <Navigate  to={redirectPath} />

}

export default AuthorizeRoute;