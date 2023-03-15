import React from 'react';
import s from "./Price.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


function Price( { price }: { price: number } ) {
   return (
      <p className={ s._ + ' text text_type_digits-default pt-1 pb-1' }>
         { price }<CurrencyIcon type="primary"/>
      </p>
   )
}


export default Price;