import s from './404.module.scss'
import { Link } from "react-router-dom"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FC } from "react";


const ErrorPage: FC = () => {
   return (
      <div className={ s._ }>
         <p className={ 'text text_type_digits-large' }>404</p>
         <p className={ 'text text_type_main-medium' }>Страница не найдена</p>

         <Link to={ '/' }>
            <Button htmlType="button" type="secondary" size="large">
               Перейти на главную страницу
            </Button>
         </Link>
      </div>
   )
}


export default ErrorPage