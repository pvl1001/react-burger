import s from './CardIngredients.module.scss'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";


CardIngredients.propTypes = {
   image: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   name: PropTypes.string.isRequired,
}


function CardIngredients( { image, price, name } ) {
   return (
      <li className={ s._ }>
         <Counter count={ 1 } size="default" extraClass="m-1"/>

         <picture className={ s.image_container }>
            <img className={ s.image } src={ image } alt="ингредиент"/>
         </picture>

         <p className={ s.price + ' text text_type_digits-default pt-1 pb-1' }>
            { price }<CurrencyIcon type="primary"/></p>

         <p className={ s.name + ' text text_type_main-small' }>{ name }</p>
      </li>
   )
}


export default CardIngredients