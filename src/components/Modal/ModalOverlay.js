import s from "./Modal.module.scss"
import PropTypes from "prop-types";


ModalOverlay.propTypes = {
   onClose: PropTypes.func.isRequired
}


function ModalOverlay( { onClose } ) {
   return (
      <div className={ s.overlay } onClick={ onClose }/>
   )
}


export default ModalOverlay