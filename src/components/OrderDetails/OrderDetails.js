import s from './OrderDetails.module.scss'
import done from 'images/done.svg'


function OrderDetails() {
   return (
      <div className={ s._ + ' pl-15 pr-15 pt-4 pb-15' }>
         <p className={ s.id + ' text text_type_digits-large mb-8' }>
            12334</p>
         <p className="text text_type_main-medium">
            идентификатор заказа</p>
         <img
            className="mt-15 mb-15"
            src={ done }
            width={ 120 }
            height={120}
            alt="готово"
         />
         <p className="text text_type_main-small mb-2">
            Ваш заказ начали готовить</p>
         <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции</p>
      </div>
   )
}


export default OrderDetails