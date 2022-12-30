import s from './BurgerConstructor.module.scss'
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerConstructor( { data } ) {
   return (
      <section>
         <ul className={ s.list + ' scrollbar pl-4 pr-4' }>
            { data.map( ( el, i ) =>
               <ConstructorItem
                  key={ el._id }
                  data={ el }
                  index={ i }
                  listLength={ data.length }
               />
            ) }
         </ul>
         <div className={ s.order + ' mt-10' }>
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