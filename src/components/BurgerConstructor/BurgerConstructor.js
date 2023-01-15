import s from './BurgerConstructor.module.scss'
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import { useContext, useState } from "react";
import withModal from "../_hocs/withModal";
import ConstructorOrder from "./ConstructorOrder";
import { IngredientsContext } from "../../context/burgerContext";


const WithModalConstructorItem = withModal( ConstructorItem )
const WithModalConstructorOrder = withModal( ConstructorOrder )

function BurgerConstructor() {
   const ingredients = useContext( IngredientsContext )
   const [ buns ] = useState( ingredients.filter( el => el.type === 'bun' ) )
   const [ fillings ] = useState( ingredients.filter( el => el.type !== 'bun' ) )


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