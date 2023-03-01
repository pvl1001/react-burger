import s from './LinkHeader.module.scss'
import { NavLink } from "react-router-dom"
import { ReactNode, FC } from "react";


interface ILinkHeaderProps {
   icon: ( isActive: boolean ) => ReactNode;
   path: string;
   name: string;
   className?: string;
}

const LinkHeader: FC<ILinkHeaderProps> = ( { icon, path, name, className = '' } ) => {
   return (
      <NavLink
         to={ path }
         className={ `${ s._ } ${ className } p-5` }>
         { ( { isActive } ) =>
            <>
               <span className="mr-2">{ icon( isActive ) }</span>
               <span className={ `text text_type_main-default ${ !isActive && 'text_color_inactive' }` }>
                  { name }</span>
            </>
         }
      </NavLink>
   )
}


export default LinkHeader