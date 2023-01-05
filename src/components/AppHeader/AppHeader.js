import s from './AppHeader.module.scss'
import LinkHeader from "./LinkHeader/LinkHeader";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";


function AppHeader() {
   const type = ( isActive ) => isActive ? 'primary' : 'secondary'

   const [ navBtns ] = useState( () => [
      {
         name: 'Конструктор',
         isActive: true,
         get icon() {
            return <BurgerIcon type={ type( this.isActive ) }/>
         },
      },
      {
         name: 'Лента заказов',
         isActive: false,
         get icon() {
            return <ListIcon type={ type( this.isActive ) }/>
         },
      },
      {
         name: 'Личный кабинет',
         isActive: false,
         get icon() {
            return <ProfileIcon type={ type( this.isActive ) }/>
         },
      },
   ] )


   return (
      <header className={ s._ }>
         <div className={ s.wrapper + ' wrapper' }>

            <div className={ s.logo }><Logo/></div>

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