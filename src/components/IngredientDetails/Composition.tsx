import s from './IngredientDetails.module.scss'
import { FC } from "react";


interface ICompositionProps {
   name: string
   value: number
}

const Composition: FC<ICompositionProps> = ( { name, value } ) => {
   return (
      <li className={ s.composition_item + ' text text_color_inactive' }>
         <p className={ 'text_type_main-default mb-2' }>{ name }</p>
         <p className={ 'text_type_digits-default' }>{ value }</p>
      </li>
   )
}


export default Composition