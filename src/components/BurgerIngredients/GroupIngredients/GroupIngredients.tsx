import s from './GroupIngredients.module.scss'
import CardIngredients from "../CardIngredients/CardIngredients";
import { IIngredient } from "../../../utils/types";
import { FC } from "react";


interface IGroupIngredientsProps {
   data: IIngredient[],
   group: {
      value: string,
      name: string,
   },
   itemRef: { current: HTMLLIElement | null },
}

const GroupIngredients: FC<IGroupIngredientsProps> = ( { group, data, itemRef } ) => {
   return (
      <li ref={ itemRef }>
         <h2 className="text text_type_main-medium">{ group.name }</h2>

         <ul className={ s.list + " pt-6 pb-10 pl-4 pr-4" }>
            { data.map( card =>
               <CardIngredients key={ card._id } data={ card }/>
            ) }
         </ul>
      </li>
   )
}


export default GroupIngredients