import s from './ProfilePage.module.scss'
import ProfileNav from "../../components/Profile/ProfileNav/ProfileNav";
import { Outlet } from "react-router-dom";
import { FC } from "react";


const ProfilePage: FC = () => {
   return (
      <div className={ s._ }>
         <ProfileNav/>
         <Outlet/>
      </div>
   )
}


export default ProfilePage