import s from './CardIngredients.module.scss'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "../../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientModal } from "../../../services/slices/currentIngredientSlice";
import { useDrag } from "react-dnd";
import { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IIngredient } from "../../../utils/types";
import { RootState } from "../../../services/store";


interface ICardIngredientsProps {
   data: IIngredient,
}

const CardIngredients: FC<ICardIngredientsProps> = ( { data } ) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()

   const { visible } = useModal()
   const { bun, ingredients } = useSelector( ( store: RootState ) => store.burgerConstructor )
   const [ , cardRef ] = useDrag( {
      type: 'ingredient',
      item: data,
   } )

   function showModalHandler() {
      if ( !visible ) {
         dispatch( getIngredientModal( data ) )
         navigate( `ingredients/${ data._id }`, { state: { background: location } } )
      }
   }

   const count = useMemo( () => [ ...ingredients, bun ].reduce( ( acc: number, el: IIngredient | null ) => {
      if ( el?._id === data._id ) {
         if ( el?.type === 'bun' ) return acc + 2
         return ++acc
      }
      return acc
   }, 0 ), [ ingredients, bun ] )


   return (
      <li className={ s._ } onClick={ showModalHandler } ref={ cardRef }>
         { !!count && <Counter count={ count } size="default" extraClass="m-1"/> }

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