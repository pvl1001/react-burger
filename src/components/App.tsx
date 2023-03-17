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
               <Route path={ '/' } element={ <HomePage/> }/>
               <Route path={ '/feed' } element={ <FeedPage/> }/>
               <Route path={ '/feed/:id' } element={ <OrderIdPage/> }/>
               <Route path={ '/ingredients/:id' } element={ <IngredientsId/> }/>
               <Route path={ '*' } element={ <ErrorPage/> }/>

               <Route path={ '/login' } element={
                  <NoAuthUserRoute>
                     <LoginPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ '/register' } element={
                  <NoAuthUserRoute>
                     <RegisterPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ '/forgot-password' } element={
                  <NoAuthUserRoute>
                     <ForgotPasswordPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ '/reset-password' } element={
                  <NoAuthUserRoute>
                     <ResetPasswordPage/>
                  </NoAuthUserRoute>
               }/>

               <Route path={ '/profile' } element={
                  <ProtectedRouteElement>
                     <ProfilePage/>
                  </ProtectedRouteElement>
               }>
                  <Route path={ '' } element={ <ProfileForm/> }/>
                  <Route path={ 'orders' } element={ <ProfileOrders/> }/>
               </Route>

               <Route path={ '/profile/orders/:id' } element={
                  <ProtectedRouteElement>
                     <OrderIdPage/>
                  </ProtectedRouteElement> }
               />
            </Routes>

            { background &&
               <Routes>
                  <Route path="/ingredients/:id" element={
                     <Modal
                        header={ 'Детали ингредиента' }
                        onClose={ onCloseIngredientModal }
                     ><IngredientDetails/></Modal>
                  }/>

                  <Route path="/profile/orders/:id" element={
                     <ProtectedRouteElement>
                        <Modal onClose={ () => navigate( -1 ) }>
                           <OrderIdPage/>
                        </Modal>
                     </ProtectedRouteElement>
                  }/>

                  <Route path="/feed/:id" element={
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
