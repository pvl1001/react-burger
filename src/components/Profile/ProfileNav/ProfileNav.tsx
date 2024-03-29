import { FC } from "react";
import s from './ProfileNav.module.scss'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../services/slices/auth/authSlice";
import { AppDispatch } from "../../../services/types";


const ProfileNav: FC = () => {
   const dispatch: AppDispatch = useDispatch()
   const navigate = useNavigate()
   const nav = [
      {
         name: 'Профиль',
         path: '',
      },
      {
         name: 'История заказов',
         path: 'orders',
      }
   ]

   async function logout() {
      const res = await dispatch( userLogout() )
      if ( res?.meta.requestStatus === 'fulfilled' ) navigate( '/login' )
   }


   return (
      <div className={ s._ }>
         <ul className={ `mb-20` }>
            { nav.map( ( { name, path } ) =>
               <li key={ name }>
                  <NavLink
                     end
                     to={ path }
                     className={ ( { isActive } ) =>
                        `${ s.nav__item } text text_type_main-medium ${ !isActive ? 'text_color_inactive' : '' }` }
                  >{ name }</NavLink>
               </li>
            ) }
            <li
               onClick={ logout }
               className={ `${ s.nav__item } text text_type_main-medium text_color_inactive` }>
               Выход
            </li>
         </ul>

         <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные</p>
      </div>
   )
}


export default ProfileNav