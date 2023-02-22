import { SyntheticEvent, useState } from 'react';


function useModal() {
   const [ visible, setVisible ] = useState<boolean>( false )

   function closeModal( e: SyntheticEvent ) {
      e.stopPropagation()
      setVisible( false )
   }

   function showModal( e: SyntheticEvent ) {
      e.stopPropagation()
      setVisible( true )
   }

   return { visible, closeModal, showModal  }
}


export default useModal;