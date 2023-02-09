import s from './ConstructorItem.module.scss'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "utils/propTypes";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeItemConstructor, sortItemConstructor } from "../../../services/slices/burgerConstructorSlice";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";


ConstructorItem.propTypes = {
   data: dataPropTypes,
   type: PropTypes.string,
   className: PropTypes.string,
   isLocked: PropTypes.bool,
   index: PropTypes.number,
}

function ConstructorItem( props ) {
   const dispatch = useDispatch()
   const ref = useRef( null )
   const {
      data,
      isLocked = false,
      className = '',
      type,
      index,
   } = props

   const [ { handlerId }, drop ] = useDrop( {
      accept: data.type === 'bun' ? 'bun' : 'ingredient',
      collect: ( monitor ) => ({
         handlerId: monitor.getHandlerId(),
      }),
      hover( item, monitor ) {
         if ( !ref.current || item.index === undefined ) return
         const dragIndex = item.index
         const hoverIndex = index
         if ( dragIndex === hoverIndex ) return
         const hoverBoundingRect = ref.current?.getBoundingClientRect()
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         const clientOffset = monitor.getClientOffset()
         const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
   }, [data, index] )
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