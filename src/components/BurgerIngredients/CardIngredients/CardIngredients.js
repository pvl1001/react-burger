import s from './CardIngredients.module.scss'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../Modal/Modal";
import { dataPropTypes } from "../../../utils/propTypes";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import useModal from "../../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { clearIngredientModal, getIngredientModal } from "../../../services/slices/currentIngredientSlice";
import { useDrag } from "react-dnd";
import { useMemo } from "react";


CardIngredients.propTypes = {
   data: dataPropTypes.isRequired,
}


function CardIngredients( { data } ) {
   const dispatch = useDispatch()
   const { closeModal, showModal, visible } = useModal()
   const { bun, ingredients } = useSelector( store => store.burgerConstructor )
   const [ , cardRef ] = useDrag( {
      type: 'ingredient',
      item: data,
   } )

   function showModalHandler( e ) {
      if ( !visible ) {
         showModal( e )
         dispatch( getIngredientModal( data ) )
      }
   }

   function closeModalHandler( e ) {
      closeModal( e )
      dispatch( clearIngredientModal() )
   }

   const count = useMemo( () => [ ...ingredients, bun ].reduce( ( acc, el ) => {
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

         { visible &&
            <Modal
               header={ 'Детали ингредиента' }
               onClose={ closeModalHandler }
            >
               <IngredientDetails data={ data }/>
            </Modal>
         }
      </li>
   )
}


export default CardIngredients