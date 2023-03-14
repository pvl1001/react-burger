import AppHeader from "./AppHeader/AppHeader"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader/Loader"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ErrorPage from "../pages/404/404"
import LoginPage from "../pages/LoginPage/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import ResetPasswordPage from "../pages/ResetPaswordPage"
import ProfilePage from "../pages/ProdfilePage/ProfilePage"
import ProtectedRouteElement from "./_hocs/ProtectedRouteElement"
import FeedPage from "../pages/Feed"
import ProfileForm from "./ProfileForm/ProfileForm"
import NoAuthUserRoute from "./_hocs/noAuthUserRoute"
import IngredientsId from "../pages/IngredientsId/IngredientsId"
import { FC, useEffect } from "react"
import { getIngredients } from "../services/slices/burgerIngredientsSlice"
import Modal from "./Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import { clearIngredientModal } from "../services/slices/currentIngredientSlice";
import { getCookie } from "../utils/setCookie";
import { getUser } from "../services/slices/authSlice";
import { AppDispatch, RootState } from "../services/store";


const App: FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const location = useLocation()
   const navigate = useNavigate()
   const loaderVisible = useSelector( ( store: RootState ) => store.loader.visible )
   const user = useSelector( ( store: RootState ) => store.auth.user )
   const background = location.state?.background

   // получаем данные ингредиентов
   useEffect( () => {
      if ( getCookie( 'token' ) && !user ) dispatch( getUser() )
      dispatch( getIngredients() )
   }, [] )

   function onCloseModal() {
      navigate( '/' )
      dispatch( clearIngredientModal() )
   }


   return (
      <>
         { loaderVisible && <Loader/> }

         <AppHeader/>

         <main className="main wrapper pt-10 pb-10">
            <Routes location={ background || location }>
               <Route path={ '/' } element={ <HomePage/> }/>
               <Route path={ '/feed' } element={ <FeedPage/> }/>
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
                  <Route path={ 'orders' } element={ <h1>Orders</h1> }>
                     <Route path={ ':id' } element={ <h1>OrderId</h1> }/>
                  </Route>
               </Route>
            </Routes>

            { background &&
               <Routes>
                  <Route
                     path="/ingredients/:id"
                     element={
                        <Modal
                           header={ 'Детали ингредиента' }
                           onClose={ onCloseModal }
                        >
                           <IngredientDetails/>
                        </Modal>
                     }
                  />
               </Routes>
            }
         </main>
      </>
   )
}


export default App
