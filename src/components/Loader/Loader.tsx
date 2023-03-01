import s from './Loader.module.scss'
import { FC } from "react";

const Loader: FC = () => {
   return (
      <div className={ s._ }>
         <div className={ s.loader }/>
      </div>
   )
}

export default Loader