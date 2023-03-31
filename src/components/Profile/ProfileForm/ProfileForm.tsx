import s from './ProfileForm.module.scss'
import { useRef, useState, useCallback, FC, ChangeEvent, FormEvent } from 'react'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import { patchUser } from "../../../services/slices/auth/authSlice";
import { IUser } from "../../../utils/types";


interface IInput {
   type: 'text' | 'email' | 'password'
   name: string
   placeholder: string
   value: string
   disabled: boolean
}

interface IInputItem {
   el: IInput
   index: number

   onChange( e: ChangeEvent<HTMLInputElement>, index: number ): void

   onIconClick( inputRef: { current: HTMLInputElement | null }, index: number ): void
}


const InputItem: FC<IInputItem> = ( { el, index, onChange, onIconClick } ) => {
   const inputRef = useRef<HTMLInputElement>( null )

   return (
      <Input
         type={ el.type }
         ref={ inputRef }
         placeholder={ el.placeholder }
         onChange={ e => onChange( e, index ) }
         icon={ 'EditIcon' }
         value={ el.value }
         disabled={ el.disabled }
         name={ el.name }
         error={ false }
         onIconClick={ () => onIconClick( inputRef, index ) }
         errorText={ 'Ошибка' }
         size={ 'default' }
      />
   )
}


const ProfileForm: FC = () => {
   const dispatch = useAppDispatch()
   const { user } = useAppSelector( store => store.auth )
   const [ isShowBtns, setIsShowBtns ] = useState<boolean>( false )
   const initialState: IInput[] = [
      {
         type: 'text',
         name: 'name',
         placeholder: 'Имя',
         value: user?.name ?? '',
         disabled: true,
      },
      {
         type: 'text',
         name: 'email',
         placeholder: 'Логин',
         value: user?.email ?? '',
         disabled: true,
      },
      {
         type: 'password',
         name: 'password',
         placeholder: 'Пароль',
         value: '',
         disabled: true,
      },
   ]
   const [ inputs, setInputs ] = useState( initialState )


   const onChange = useCallback( ( e: ChangeEvent<HTMLInputElement>, i: number ) => {
      setIsShowBtns( true )
      setInputs( prev => prev.map( ( input, index ) => {
            if ( index === i ) input.value = e.target.value
            return input
         } )
      )
   }, [ setInputs ] )

   function onIconClick( currentRef: { current: HTMLInputElement | null }, idx: number ) {
      setInputs( prev => prev.map( ( el, i ) => {
         if ( i === idx ) el.disabled = !el.disabled
         return el
      } ) )
      setTimeout( () => currentRef.current?.focus(), 0 )
   }

   function resetForm() {
      setInputs( initialState )
      setIsShowBtns( false )
   }

   async function onSubmit( e: FormEvent<HTMLFormElement> ) {
      e.preventDefault()
      const user: IUser = inputs.reduce( ( total, el ) => ({ ...total, [el.name]: el.value }), {} as IUser )
      await dispatch( patchUser( user ) )

      setIsShowBtns( false )
      setInputs( prev => prev.map( el => ({ ...el, disabled: true }) ) )
   }


   return (
      <form className={ s._ } onSubmit={ onSubmit }>
         { inputs.map( ( el, i ) =>
            <InputItem
               key={ el.name }
               el={ el }
               index={ i }
               onChange={ onChange }
               onIconClick={ onIconClick }
            />
         ) }

         { isShowBtns &&
            <div className={ s.btns }>
               <Button
                  htmlType="button"
                  type="secondary"
                  size="large"
                  onClick={ resetForm }
               >Отмена</Button>

               <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
               >Сохранить</Button>
            </div> }
      </form>
   )
}


export default ProfileForm