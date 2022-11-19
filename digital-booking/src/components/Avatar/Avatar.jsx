import React from 'react'
import CloseIcon from '../../shared/Icons/CloseIcon';
import './Avatar.scss';
export const Avatar = ({name, lastName, logOut}) => {
  return (
    <div className='db-avatar'>
      <span className='db-avatar-initials'>
        {name && name.charAt(0)} {lastName && lastName.charAt(0)}
      </span>
      <div  className='db-avatar-name'>
        <span>Hola,</span>
        <span>{name} {lastName}</span>
      </div>
      <div onClick={logOut}>
        <CloseIcon/>
      </div>
    </div>
  )
}
