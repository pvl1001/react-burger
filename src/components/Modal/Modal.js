import s from './Modal.module.scss'
import ReactDOM from "react-dom"
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";
import { useEffect } from "react";


Modal.propTypes = {
   children: PropTypes.node,
   onClose: PropTypes.func,
   header: PropTypes.string,
}


function Modal( { children, header, onClose } ) {
   // закрыть окно при нажатии "Escape"
   useEffect( () => {
      function keydownHandler( e ) {
         if ( e.key === 'Escape' ) onClose( e )
      }

      document.addEventListener( 'keydown', keydownHandler )
      return () => document.removeEventListener( 'keydown', keydownHandler )
   }, [] )


   return ReactDOM.createPortal(
      <div className={ s._ }>

         <div className={ s.modal + ' pt-10 pl-10 pr-10 pb-15' }>

            <button className={ s.close_btn } onClick={ onClose }>
               <CloseIcon type="primary"/>
            </button>

            <h1 className={ s.title + ' text text_type_main-large' }>{ header }</h1>

            { children }
         </div>

         <ModalOverlay onClose={ onClose }/>
      </div>,
      document.getElementById( 'modal' )
   )
}


export default Modal