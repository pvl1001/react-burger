import { useState } from 'react'
import s from "./LoginPage/LoginPage.module.scss"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { forgotPasswordRequest } from "../utils/burger-api"
import { useDispatch } from "react-redux"
import { toggleLoader } from "../services/slices/loaderSlice"


function ForgotPasswordPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const [ value, setValue ] = useState( { email: '' } )


   function onChange( e ) {
      setValue( prev => ({ ...prev, [e.target.name]: e.target.value }) )
   }

   async function onSubmit( e ) {
      e.preventDefault()

      try {
         dispatch( toggleLoader() )
         const { success } = await forgotPasswordRequest( value )
         if ( success ) navigate( '/reset-password', { state: { pathfrom: location.pathname } } )
      } catch ( err ) {
         console.log( 'Ошибка запроса! ' + err )
      } finally {
         dispatch( toggleLoader() )
      }

   }


   return (
      <form className={ s.form } onSubmit={ onSubmit }>
         <h5 className="text text_type_main-medium mb-6">Восстановление пароля</h5>

         <EmailInput
            placeholder={ 'Укажите e-mail' }
            extraClass={ 'mb-6' }
            onChange={ onChange }
            value={ value.email }
            name={ 'email' }
         />

         <Button
            extraClass={ s.button + ' mb-20' }
            htmlType="submit"
            type="primary"
            size="medium"
         >Восстановить</Button>

         <p className={ 'text text_type_main-default text_color_inactive' }>
            Вспомнили пароль?
            <Link to={ '/login' } className={ s.link }>Войти</Link>
         </p>

      </form>
   )
}

export default ForgotPasswordPage