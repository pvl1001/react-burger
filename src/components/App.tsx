import AppHeader from "./AppHeader/AppHeader"
import Loader from "./Loader/Loader"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ErrorPage from "../pages/404/404"
import LoginPage from "../pages/LoginPage/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import ResetPasswordPage from "../pages/ResetPaswordPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import ProtectedRouteElement from "./_hocs/ProtectedRouteElement"
import ProfileForm from "./Profile/ProfileForm/ProfileForm"
import NoAuthUserRoute from "./_hocs/noAuthUserRoute"
import IngredientsId from "../pages/IngredientsId/IngredientsId"
import { FC, useEffect } from "react"
import { getIngredients } from "../services/slices/burgerIngredientsSlice"
import Modal from "./Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import { clearIngredientModal } from "../services/slices/currentIngredientSlice";
import { getCookie } from "../utils/setCookie";
import { getUser } from "../services/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../services/store";
import FeedPage from "../pages/FeedPage/FeedPage";
import OrderIdPage from "../pages/FeedIdPage/OrderIdPage";
import ProfileOrders from "./Profile/ProfileOrders/ProfileOrders";
import routes from "../utils/routes";


const App: FC = () => {
   const dispatch = useAppDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const loaderVisible = useAppSelector( store => store.loader.visible )
   const user = useAppSelector( store => store.auth.user )
   const background = location.state?.background

   // получаем данные ингредиентов
   useEffect( () => {
      if ( getCookie( 'token' ) && !user ) dispatch( getUser() )
      dispatch( getIngredients() )
   }, [] )

   function onCloseIngredientModal() {
      navigate( -1 )
      dispatch( clearIngredientModal() )
   }


   return (
      <>
         { loaderVisible && <Loader/> }

         <AppHeader/>

         <main className="main wrapper pt-10">
            <Routes location={ background || location }>
               <Route path={ routes.home } element={ <HomePage/> }/>
               <Route path={ routes.feed } element={ <FeedPage/> }/>
               <Route path={ routes.feedId } element={ <OrderIdPage/> }/>
               <Route path={ routes.ingredientsId } element={ <IngredientsId/> }/>
               <Route path={ routes.error } element={ <ErrorPage/> }/>

               <Route path={ routes.login } element={
                  <NoAuthUserRoute>
                     <LoginPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ routes.register } element={
                  <NoAuthUserRoute>
                     <RegisterPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ routes.forgotPassword } element={
                  <NoAuthUserRoute>
                     <ForgotPasswordPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ routes.resetPassword } element={
                  <NoAuthUserRoute>
                     <ResetPasswordPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ routes.profile } element={
                  <ProtectedRouteElement>
                     <ProfilePage/>
                  </ProtectedRouteElement>
               }>
                  <Route path={ routes.profile } element={ <ProfileForm/> }/>
                  <Route path={ routes.orders } element={ <ProfileOrders/> }/>
               </Route>

               <Route path={ routes.ordersId } element={
                  <ProtectedRouteElement>
                     <OrderIdPage/>
                  </ProtectedRouteElement> }
               />
            </Routes>

            { background &&
               <Routes>
                  <Route path={ routes.ingredientsId } element={
                     <Modal
                        header={ 'Детали ингредиента' }
                        onClose={ onCloseIngredientModal }
                     ><IngredientDetails/></Modal>
                  }/>

                  <Route path={ routes.ordersId } element={
                     <ProtectedRouteElement>
                        <Modal onClose={ () => navigate( -1 ) }>
                           <OrderIdPage/>
                        </Modal>
                     </ProtectedRouteElement>
                  }/>

                  <Route path={ routes.feedId } element={
                     <Modal onClose={ () => navigate( -1 ) }>
                        <OrderIdPage/>
                     </Modal>
                  }/>
               </Routes>
            }
         </main>
      </>
   )
}


export default App
