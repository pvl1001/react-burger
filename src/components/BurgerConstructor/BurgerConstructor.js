import s from './BurgerConstructor.module.scss'
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import PropTypes from 'prop-types'
import { dataPropTypes } from "../../utils/propTypes";
import { useState } from "react";
import withModal from "../_hocs/withModal";
import ConstructorOrder from "./ConstructorOrder";


BurgerConstructor.propTypes = {
   data: PropTypes.arrayOf( dataPropTypes )
}


const WithModalConstructorItem = withModal( ConstructorItem )
const WithModalConstructorOrder = withModal( ConstructorOrder )

function BurgerConstructor( { data } ) {
   const [ buns ] = useState( data.filter( el => el.type === 'bun' ) )
   const [ fillings ] = useState( data.filter( el => el.type !== 'bun' ) )


   return (
      <section>
         <WithModalConstructorItem
            className={ 'pl-4 pr-4 pb-4' }
            data={ buns[0] }
            type={ 'top' }
            isLocked
         />

         <ul className={ s.list + ' scrollbar pl-4 pr-4' }>
            { fillings.map( el => <WithModalConstructorItem key={ el._id } data={ el }/> ) }
         </ul>

         <WithModalConstructorItem
            className={ 'pl-4 pr-4 pt-4' }
            data={ buns[0] }
            type={ 'bottom' }
            isLocked
         />

         <WithModalConstructorOrder/>

      </section>
   )
}


export default BurgerConstructor