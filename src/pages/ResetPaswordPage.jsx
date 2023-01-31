import { useState } from 'react'
import s from "./LoginPage/LoginPage.module.scss"
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { toggleLoader } from "../services/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { resetPasswordRequest } from "../utils/burger-api";


function ResetPasswordPage() {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const [ value, setValue ] = useState( { token: '', password: '' } )

   function onChange( e ) {
      setValue( prev => ({ ...prev, [e.target.name]: e.target.value }) )
   }

   async function onSubmit( e ) {
      e.preventDefault()

      try {
         dispatch( toggleLoader() )
         const { success } = await resetPasswordRequest( {
            password: value.password,
            token: value.token
         } )
         if ( success ) navigate( '/login' )
      } catch ( err ) {
         console.log( 'Ошибка запроса! ' + err, value )
      } finally {
         dispatch( toggleLoader() )
      }
   }


   // Переадресовываем на главную страницу
   if ( location.state?.pathfrom !== '/forgot-password' ) return <Navigate to='/' replace/>

   return (

      <form className={ s.form } onSubmit={ onSubmit }>
         <h5 className="text text_type_main-medium mb-6">Восстановление пароля</h5>

         <PasswordInput
            placeholder={ 'Введите новый пароль' }
            extraClass={ 'mb-6' }
            onChange={ onChange }
            value={ value.password }
            name={ 'password' }
         />

         <Input
            type={ 'text' }
            placeholder={ 'Введите код из письма' }
            onChange={ onChange }
            value={ value.token }
            name={ 'token' }
            error={ false }
            errorText={ 'Ошибка' }
            size={ 'default' }
            extraClass="mb-6"
         />

         <Button
            extraClass={ s.button + ' mb-20' }
            htmlType="submit"
            type="primary"
            size="medium"
         >Сохранить</Button>

         <p className={ 'text text_type_main-default text_color_inactive' }>
            Вспомнили пароль?
            <Link to={ '/login' } className={ s.link }>Войти</Link>
         </p>

      </form>
   )
}


export default ResetPasswordPage