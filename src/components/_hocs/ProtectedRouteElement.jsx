import { Navigate, useLocation } from "react-router-dom"
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";


ProtectedRouteElement.propTypes = {
   children: PropTypes.node
}


export function ProtectedRouteElement( { children } ) {
   const { auth, isUserLoaded } = useAuth()
   const location = useLocation()

   if ( !isUserLoaded ) return null
   return auth.user === null
      ? <Navigate to="/login" state={ { pathfrom: location.pathname } } replace/>
      : children
}


export default ProtectedRouteElement