import s from './ProfileForm.module.scss'
import { useRef, useState, useCallback } from 'react'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { patchUser } from "../../services/slices/authSlice";


InputItem.propTypes = {
   el: PropTypes.shape( {
      type: PropTypes.string,
      name: PropTypes.string,
      placeholder: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool,
   } ),
   index: PropTypes.number,
   onChange: PropTypes.func,
   onIconClick: PropTypes.func
}


function InputItem( { el, index, onChange, onIconClick } ) {
   const inputRef = useRef( null )

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


function ProfileForm() {
   const dispatch = useDispatch()
   const { user } = useSelector( store => store.auth )
   const [ isShowBtns, setIsShowBtns ] = useState()
   const initialState = [
      {
         type: 'text',
         name: 'name',
         placeholder: 'Имя',
         value: user.name,
         disabled: true,
      },
      {
         type: 'text',
         name: 'email',
         placeholder: 'Логин',
         value: user.email,
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


   const onChange = useCallback( ( e, i ) => {
      setIsShowBtns( true )
      setInputs( prev => prev.map( ( input, index ) => {
            if ( index === i ) input.value = e.target.value
            return input
         } )
      )
   }, [ setInputs ] )

   function onIconClick( inputRef, idx ) {
      setInputs( prev => prev.map( ( el, i ) => {
         if ( i === idx ) el.disabled = !el.disabled
         return el
      } ) )
      setTimeout( () => inputRef.current.focus(), 0 )
   }

   function resetForm() {
      setInputs( initialState )
      setIsShowBtns( false )
   }

   function onSubmit( e ) {
      e.preventDefault()
      const user = inputs.reduce( ( total, el ) => ({ ...total, [el.name]: el.value }), {} )
      dispatch( patchUser( user ) )

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