import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";


NoAuthUserRoute.propTypes = {
   children: PropTypes.node
}

function NoAuthUserRoute( { children } ) {
   const { auth, isUserLoaded } = useAuth()
   const location = useLocation()

   if ( !isUserLoaded ) return null
   return auth.user
      ? <Navigate to="/" state={ { pathfrom: location.pathname } } replace/>
      : children
}


export default NoAuthUserRoute