import s from './BurgerConstructor.module.scss'
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'
import { dataPropTypes } from "../../utils/propTypes";
import { useState } from "react";


BurgerConstructor.propTypes = {
   data: PropTypes.arrayOf( dataPropTypes ).isRequired
}


function BurgerConstructor( { data } ) {
   const [ buns ] = useState( data.filter( el => el.type === 'bun' ) )
   const [ fillings ] = useState( data.filter( el => el.type !== 'bun' ) )


   return (
      <section>
         <ConstructorItem
            className={ 'pl-4 pr-4 pb-4' }
            data={ buns[0] }
            type={ 'top' }
            isLocked
         />

         <ul className={ s.list + ' scrollbar pl-4 pr-4' }>
            { fillings.map( el => <ConstructorItem key={ el._id } data={ el }/> ) }
         </ul>

         <ConstructorItem
            className={ 'pl-4 pr-4 pt-4' }
            data={ buns[0] }
            type={ 'bottom' }
            isLocked
         />

         <div className={ s.order + ' mt-10 pr-4' }>
            <p className={ s.price + ' text text_type_digits-medium mr-10' }>
               610 <CurrencyIcon type="primary"/>
            </p>

            <Button htmlType="button" type="primary" size="large">
               Оформить заказ
            </Button>
         </div>
      </section>
   )
}


export default BurgerConstructor