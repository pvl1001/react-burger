import React, { FC, PropsWithChildren } from 'react';
import s from "./Price.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const Price: FC<PropsWithChildren> = ( { children } ) => {
   return (
      <p className={ s._ + ' text text_type_digits-default pt-1 pb-1' }>
         { children }<CurrencyIcon type="primary"/>
      </p>
   )
}


export default Price;