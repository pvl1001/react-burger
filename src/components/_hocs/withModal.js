import { useEffect, useState } from 'react';

/* eslint-disable react/display-name */
const withModal = WrappedComponent => props => {
   const [ visible, setVisible ] = useState( false )

   // закрыть окно при нажатии "Escape"
   useEffect( () => {
      function keydownHandler( { key } ) {
         if ( key === 'Escape' ) setVisible( false )
      }

      document.addEventListener( 'keydown', keydownHandler )
      return () => document.removeEventListener( 'keydown', keydownHandler )
   }, [] )


   function closeModal( e ) {
      e.stopPropagation()
      setVisible( false )
   }

   function showModal( e ) {
      e.stopPropagation()
      setVisible( true )
   }


   return (
      <WrappedComponent
         { ...props }
         visible={ visible }
         closeModal={ closeModal }
         showModal={ showModal }
      />
   )
}


export default withModal;