import { useState } from 'react'
import s from "./LoginPage/LoginPage.module.scss"
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { userRegister } from "../services/slices/authSlice";


function RegisterPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [ value, setValue ] = useState( { name: '', email: '', password: '' } )

   function onChange( e ) {
      setValue( prev => ({ ...prev, [e.target.name]: e.target.value }) )
   }

   async function onClickHandler() {
      const { success } = await dispatch( userRegister( value ) )
      if ( success ) navigate( '/login' )
   }


   return (
      <form className={ s.form }>
         <h5 className="text text_type_main-medium mb-6">Вход</h5>

         <Input
            type={ 'text' }
            placeholder={ 'Имя' }
            onChange={ onChange }
            value={ value.name }
            name={ 'name' }
            error={ false }
            errorText={ 'Ошибка' }
            size={ 'default' }
            extraClass="mb-6"
         />

         <EmailInput
            extraClass={ 'mb-6' }
            onChange={ onChange }
            value={ value.email }
            name={ 'email' }
         />

         <PasswordInput
            extraClass={ 'mb-6' }
            onChange={ onChange }
            value={ value.password }
            name={ 'password' }
         />

         <Button
            extraClass={ s.button + ' mb-20' }
            htmlType="button"
            type="primary"
            size="medium"
            onClick={ onClickHandler }
         >Зарегистрироваться</Button>

         <p className={ 'text text_type_main-default text_color_inactive' }>
            Уже зарегистрированы?
            <Link to={ '/login' } className={ s.link }>Войти</Link>
         </p>

      </form>
   )
}


export default RegisterPage