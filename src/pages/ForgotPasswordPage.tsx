import s from "./LoginPage/LoginPage.module.scss"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { forgotPasswordRequest } from "../utils/burger-api"
import { useDispatch } from "react-redux"
import { toggleLoader } from "../services/slices/loaderSlice"
import { useForm } from "../hooks/useForm";
import { FC, FormEvent } from "react";


const ForgotPasswordPage: FC = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const { values, handleChange } = useForm( { email: '' } )

   async function onSubmit( e: FormEvent<HTMLFormElement> ) {
      e.preventDefault()

      try {
         dispatch( toggleLoader() )
         const { success } = await forgotPasswordRequest( values )
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
            required
            placeholder={ 'Укажите e-mail' }
            extraClass={ 'mb-6' }
            onChange={ handleChange }
            value={ values.email }
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