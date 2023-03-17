import s from './ProdilePage.module.scss'
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import { Outlet } from "react-router-dom";
import { FC } from "react";


const ProfilePage: FC = () => {
   return (
      <div className={ s.row }>
         <ProfileNav/>
         <Outlet/>
      </div>
   )
}


export default ProfilePage