import s from './LinkHeader.module.scss'
import PropTypes from "prop-types";


LinkHeader.propTypes = {
   icon: PropTypes.node.isRequired,
   isActive: PropTypes.bool.isRequired,
   name: PropTypes.string.isRequired,
   className: PropTypes.string,
}


function LinkHeader( { icon, isActive, name, className = '' } ) {
   const textStyle = isActive ? '' : 'text_color_inactive'

   return (
      <a href={' '} type="button" className={ `${ s._ } ${ className } p-5` }>
         <span className="mr-2">{ icon }</span>
         <span className={ "text text_type_main-default " + textStyle }>{ name }</span>
      </a>
   )
}


export default LinkHeader