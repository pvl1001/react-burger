import s from './Modal.module.scss'
import ReactDOM from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";
import { FC, PropsWithChildren, useEffect } from "react";


interface IModalProps {
   header?: string
   onClose(): void
}

const Modal: FC<PropsWithChildren<IModalProps>> = ( { children, header, onClose } ) => {

   // закрыть окно при нажатии "Escape"
   useEffect( () => {
      function keydownHandler( e: KeyboardEvent ) {
         if ( e.key === 'Escape' ) onClose()
      }

      document.addEventListener( 'keydown', keydownHandler )
      return () => document.removeEventListener( 'keydown', keydownHandler )
   }, [] )


   return ReactDOM.createPortal(
      <div className={ s._ }>

         <div className={ s.modal + ' pt-10 pl-10 pr-10 pb-15' }>

            <button data-cy="close_btn" className={ s.close_btn } onClick={ onClose }>
               <CloseIcon type="primary"/>
            </button>

            { header &&
               <h1 className={ s.title + ' text text_type_main-large' }>{ header }</h1> }

            { children }
         </div>

         <ModalOverlay onClose={ onClose }/>
      </div>,
      document.getElementById( 'modal' ) as HTMLElement
   )
}


export default Modal