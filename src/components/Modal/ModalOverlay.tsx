import s from "./Modal.module.scss"
import { FC, KeyboardEvent, MouseEvent } from "react";


interface IModalOverlayProps {
   onClose( e: MouseEvent | KeyboardEvent ): void
}


const ModalOverlay: FC<IModalOverlayProps> = ( { onClose } ) => {
   return (
      <div className={ s.overlay } onClick={ onClose }/>
   )
}


export default ModalOverlay