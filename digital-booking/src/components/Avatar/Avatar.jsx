import React, { useState } from 'react'
import CloseIcon from '../../shared/Icons/CloseIcon';
import './Avatar.scss';
import { Link } from "react-router-dom";
import HeartIcon from "../../shared/Icons/HeartIcon"
import ReservationIcon from "../../shared/Icons/ReservationIcon"
import { useContext } from 'react';
import { Context } from '../../core/Context';


export const Avatar = ({ name, lastName, logOut }) => {
  const appContext = useContext(Context);

  return (
    <>
      <div className='db-avatar'>
        <span className='db-avatar-initials'>
          {name && name.charAt(0).toUpperCase()} {lastName && lastName.charAt(0).toUpperCase()}
        </span>
        <div className='db-user-nav'>
          <div className='db-avatar-name'>
            <span>Hola,</span>
            <span>{name} {lastName}</span>     
          </div>
        </div>
        <div className='db-avatar-close' onClick={logOut}>
            <CloseIcon/>
        </div>
      </div>
    </>
    
  )
}
