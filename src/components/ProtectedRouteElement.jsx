import { Navigate } from "react-router-dom"


export const ProtectedRouteElement = ({ element }) => {
   let { getUser, ...auth } = useAuth()
   const [isUserLoaded, setUserLoaded] = useState(false)

   const init = async () => {
      await getUser()
      setUserLoaded(true)
   }

   useEffect(() => {
      init()
   }, [])

   if (!isUserLoaded) {
      return null
   }

   return auth.user ? element : <Navigate to="/login" replace/>
}


export default ProtectedRouteElement