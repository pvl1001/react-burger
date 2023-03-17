import { FC, PropsWithChildren, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


interface IProps {
   children: ReactElement
}

const NoAuthUserRoute: FC<PropsWithChildren<IProps>> = ( { children } ) => {
   const location = useLocation()
   const  { auth } = useAuth()

   return auth.user
      ? <Navigate to="/" state={ { pathfrom: location.pathname } } replace/>
      : children
}


export default NoAuthUserRoute