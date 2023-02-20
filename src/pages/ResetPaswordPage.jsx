import s from "./LoginPage/LoginPage.module.scss"
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { toggleLoader } from "../services/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { resetPasswordRequest } from "../utils/burger-api";
import { useForm } from "../hooks/useForm";


function ResetPasswordPage() {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const { values, handleChange } = useForm( { token: '', password: '' } )

   async function onSubmit( e ) {
      e.preventDefault()

      try {
         dispatch( toggleLoader() )
         const { success } = await resetPasswordRequest( {
            password: values.password,
            token: values.token
         } )
         if ( success ) navigate( '/login' )
      } catch ( err ) {
         console.log( 'Ошибка запроса! ' + err, values )
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
            required
            placeholder={ 'Введите новый пароль' }
            extraClass={ 'mb-6' }
            onChange={ handleChange }
            value={ values.password }
            name={ 'password' }
         />

         <Input
            required
            type={ 'text' }
            placeholder={ 'Введите код из письма' }
            onChange={ handleChange }
            value={ values.token }
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