import { useState } from 'react';


function useModal() {
   const [ visible, setVisible ] = useState( false )

   function closeModal( e ) {
      e.stopPropagation()
      setVisible( false )
   }

   function showModal( e ) {
      e.stopPropagation()
      setVisible( true )
   }

   return { visible, closeModal, showModal  }
}


export default useModal;