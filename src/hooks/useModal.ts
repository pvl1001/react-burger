import { useState } from 'react';


function useModal() {
   const [ visible, setVisible ] = useState<boolean>( false )

   function closeModal() {
      setVisible( false )
   }

   function showModal() {
      setVisible( true )
   }

   return { visible, closeModal, showModal }
}


export default useModal;