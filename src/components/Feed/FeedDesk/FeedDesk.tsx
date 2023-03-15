import { FC } from 'react';
import s from './FeedDesk.module.scss';


const FeedDesk: FC = () => {
   return (
      <div className={ s._ }>
         <div className={ s.row }>
            <div className={ s.status }>
               <h5 className="text text_type_main-medium mb-6">Готовы:</h5>
               <ul className={ `${ s.status_list } ${ s.done }` }>
                  <li className="text text_type_digits-default">324234</li>
                  <li className="text text_type_digits-default">324234</li>
                  <li className="text text_type_digits-default">324234</li>
               </ul>
            </div>
            <div className={ s.status }>
               <h5 className="text text_type_main-medium mb-6">В работе:</h5>
               <ul className={ s.status_list }>
                  <li className="text text_type_digits-default">324234</li>
                  <li className="text text_type_digits-default">324234</li>
                  <li className="text text_type_digits-default">324234</li>
               </ul>
            </div>
         </div>

         <div>
            <h5 className="text text_type_main-medium">
               Выполнено за все время:
            </h5>
            <p className="text text_type_digits-large">3333</p>
         </div>

         <div>
            <h5 className="text text_type_main-medium">
               Выполнено за сегодня:
            </h5>
            <p className="text text_type_digits-large">10</p>
         </div>
      </div>
   )
}


export default FeedDesk;