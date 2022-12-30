import s from './CardIngredients.module.scss'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


function CardIngredients( { data } ) {
   return (
      <li className={ s._ }>
         <Counter count={ 1 } size="default" extraClass="m-1"/>

         <picture className={ s.image_container }>
            <img className={ s.image } src={ data.image } alt="ингредиент"/>
         </picture>

         <p className={ s.price + ' text text_type_digits-default pt-1 pb-1' }>
            { data.price }<CurrencyIcon type="primary"/></p>

         <p className={ s.name + ' text text_type_main-small' }>{ data.name }</p>
      </li>
   )
}


export default CardIngredients