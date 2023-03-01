import s from './AppHeader.module.scss'
import LinkHeader from "./LinkHeader/LinkHeader";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import { Link } from "react-router-dom";


const AppHeader: FC = () => {
   const type = ( isActive: boolean ) => isActive ? 'primary' : 'secondary'

   const [ navBtns ] = useState( () => [
      {
         name: 'Конструктор',
         path: '/',
         icon: ( isActive: boolean ) => <BurgerIcon type={ type( isActive ) }/>
      },
      {
         name: 'Лента заказов',
         path: '/feed',
         icon: ( isActive: boolean ) => <ListIcon type={ type( isActive ) }/>
      },
      {
         name: 'Личный кабинет',
         path: '/profile',
         icon: ( isActive: boolean ) => <ProfileIcon type={ type( isActive ) }/>
      },
   ] )


   return (
      <header className={ s._ }>
         <div className={ s.wrapper + ' wrapper' }>

            <Link to={'/'} className={ s.logo }><Logo/></Link>

            <nav className={ s.nav }>
               <ul className={ s.list }>
                  { navBtns.map( btn =>
                     <li key={ btn.name } className="mr-2"><LinkHeader { ...btn }/></li>
                  ) }
               </ul>
            </nav>

         </div>
      </header>
   )
}


export default AppHeader