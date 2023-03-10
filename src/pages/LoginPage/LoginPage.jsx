import s from './LoginPage.module.scss'
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/slices/authSlice";
import { useForm } from "../../hooks/useForm";


function LoginPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const { values, handleChange } = useForm( { email: '', password: '' } )

   async function onSubmit( e ) {
      e.preventDefault()
      const { success } = await dispatch( userLogin( values ) )
      if ( success ) navigate( location.state.pathfrom || '/' )
   }


   return (
      <form className={ s.form } onSubmit={ onSubmit }>
         <h5 className="text text_type_main-medium mb-6">Вход</h5>

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
            htmlType={ 'submit' }
            extraClass={ s.button + ' mb-20' }
            type="primary"
            size="medium"
         >Войти</Button>

         <p className={ 'text text_type_main-default text_color_inactive mb-4' }>
            Вы — новый пользователь?
            <Link to={ '/register' } className={ s.link }>Зарегистрироваться</Link>
         </p>

         <p className={ 'text text_type_main-default text_color_inactive' }>
            Забыли пароль?
            <Link to={ '/forgot-password' } className={ s.link }>Восстановить пароль</Link>
         </p>
      </form>
   )
}


export default LoginPage