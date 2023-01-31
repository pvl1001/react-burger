import AppHeader from "./AppHeader/AppHeader";
import { useSelector } from "react-redux";
import Loader from "./Loader/Loader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/404";


function App() {
   const loaderVisible = useSelector( store => store.loader.visible )


   return (
      <>
         { loaderVisible && <Loader/> }

         <AppHeader/>
         <main className="main wrapper pt-10 pb-10">
            <BrowserRouter>
               <Routes>
                  <Route path={ '/' } element={ <HomePage/> }/>
                  <Route path={ '*' } element={ <ErrorPage/> }/>
               </Routes>
            </BrowserRouter>
         </main>

      </>
   )
}


export default App
