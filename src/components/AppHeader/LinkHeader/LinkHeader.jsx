import s from './LinkHeader.module.scss'
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"


LinkHeader.propTypes = {
   icon: PropTypes.func.isRequired,
   path: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   className: PropTypes.string,
}


function LinkHeader( { icon, path, name, className = '' } ) {

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