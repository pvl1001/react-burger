import s from "./Status.module.scss";


function Status( { status }: { status: string } ) {

   const currentStatus =
      status === 'done' ? 'Выполнен' :
         status === 'pending' ? 'Готовится' :
            status === 'created' ? 'Создан' :
               'Отменён'
   const statusClass = status === 'done' ? s.done : ''


   return (
      <span className={ statusClass + " text text_type_main-default mt-2" }>
         { currentStatus }
      </span>
   )
}


export default Status;