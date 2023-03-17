import s from './ConstructorItem.module.scss'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeItemConstructor, sortItemConstructor } from "../../../services/slices/burgerConstructorSlice";
import { FC, useRef } from "react";
import { IIngredient } from "../../../utils/types";
import type { Identifier, XYCoord } from 'dnd-core'


interface IConstructorItemProps {
   data: IIngredient,
   isLocked?: boolean,
   className?: string,
   type?: 'top' | 'bottom',
   index?: number,
}

const ConstructorItem: FC<IConstructorItemProps> = (
   {
      data,
      isLocked = false,
      className = '',
      type,
      index,
   } ) => {

   const dispatch = useDispatch()
   const ref = useRef<HTMLLIElement>( null )

   const [ { handlerId }, drop ] = useDrop<IIngredient, void, { handlerId: Identifier | null }>( {
      accept: data.type === 'bun' ? 'bun' : 'ingredient',
      collect: ( monitor ) => ({
         handlerId: monitor.getHandlerId(),
      }),
      hover( item: IIngredient, monitor ) {
         if ( !ref.current || item.index === undefined ) return
         const dragIndex = item.index
         const hoverIndex = index
         if ( hoverIndex === undefined ) return
         const hoverBoundingRect = ref.current?.getBoundingClientRect()
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         const clientOffset = monitor.getClientOffset()
         const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
         if ( dragIndex < hoverIndex && hoverClientY < hoverMiddleY ) return
         if ( dragIndex > hoverIndex && hoverClientY > hoverMiddleY ) return
         // перенести ингредиент в конструкторе
         dispatch( sortItemConstructor( { dragIndex, hoverIndex } ) )
         item.index = hoverIndex
      },
   } )
   const [ { isDragging }, drag ] = useDrag( {
      type: data.type === 'bun' ? 'bun' : 'ingredient',
      item: { item: data, index },
      collect: ( monitor ) => ({
         isDragging: monitor.isDragging(),
      }),
   }, [ data, index ] )
   const bunPosition = type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : ''

   function handleClose() {
      dispatch( removeItemConstructor( data.item_id ) )
   }

   drag( drop( ref ) )


   return (
      <li
         ref={ ref }
         className={ `${ s._ } ${ className }` }
         style={ { opacity: isDragging ? 0 : 1 } }
         data-handler-id={ handlerId }
      >
         <div className={ s.icon }>
            { !type && <DragIcon type="primary"/> }
         </div>

         <ConstructorElement
            type={ type }
            isLocked={ isLocked }
            text={ data.name + bunPosition }
            price={ data.price }
            thumbnail={ data.image }
            handleClose={ handleClose }
         />
      </li>
   )
}


export default ConstructorItem