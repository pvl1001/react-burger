import { ChangeEvent, useState } from "react"

export function useForm( inputValues: any ) {
   const [ values, setValues ] = useState( inputValues )

   const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
      const { value, name } = e.target
      setValues( { ...values, [name]: value } )
   }

   return { values, handleChange, setValues }
}