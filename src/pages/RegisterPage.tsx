import s from "./LoginPage/LoginPage.module.scss"
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { userRegister } from "../services/slices/authSlice";
import { useForm } from "../hooks/useForm";
import { FC, FormEvent } from "react";
import { AppDispatch } from "../services/store";


const RegisterPage: FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const { values, handleChange } = useForm( { name: '', email: '', password: '' } )

   async function onSubmit( e: FormEvent<HTMLFormElement> ) {
      e.preventDefault()

      const res = await dispatch( userRegister( values ) )
      if ( res?.success ) navigate( '/login' )
   }


   return (
      <form className={ s.form } onSubmit={ onSubmit }>
         <h5 className="text text_type_main-medium mb-6">Регистрация</h5>

         <Input
            required
            type={ 'text' }
            placeholder={ 'Имя' }
            onChange={ handleChange }
            value={ values.name }
            name={ 'name' }
            error={ false }
            errorText={ 'Ошибка' }
            size={ 'default' }
            extraClass="mb-6"
         />

         <EmailInput
            required
            extraClass={ 'mb-6' }
            onChange={ handleChange }
            value={ values.email }
            name={ 'email' }
         />

         <PasswordInput
            required
            extraClass={ 'mb-6' }
            onChange={ handleChange }
            value={ values.password }
            name={ 'password' }
         />

         <Button
            extraClass={ s.button + ' mb-20' }
            htmlType="submit"
            type="primary"
            size="medium"
         >Зарегистрироваться</Button>

         <p className={ 'text text_type_main-default text_color_inactive' }>
            Уже зарегистрированы?
            <Link to={ '/login' } className={ s.link }>Войти</Link>
         </p>

      </form>
   )
}


export default RegisterPage