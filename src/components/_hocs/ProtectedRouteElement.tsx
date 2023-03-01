import { FC, PropsWithChildren, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth";


interface IProps {
   children: ReactElement
}

const ProtectedRouteElement: FC<PropsWithChildren<IProps>> = ( { children } ) => {
   const location = useLocation()
   const { auth, isUserLoaded } = useAuth()

   if ( !isUserLoaded ) return null
   return auth.user === null
      ? <Navigate to="/login" state={ { pathfrom: location.pathname } } replace/>
      : children
}


export default ProtectedRouteElement