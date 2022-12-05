import React, { useState } from 'react'
import CloseIcon from '../../shared/Icons/CloseIcon';
import './Avatar.scss';
import { Link } from "react-router-dom";
import HeartIcon from "../../shared/Icons/HeartIcon"
import ReservationIcon from "../../shared/Icons/ReservationIcon"


export const Avatar = ({ name, lastName, logOut }) => {

  return (
    <div className='db-avatar'>
      <span className='db-avatar-initials'>
        {name && name.charAt(0)} {lastName && lastName.charAt(0)}
      </span>
      <div className='db-user-nav'>
        <div className='db-avatar-name'>
          <span>Hola,</span>
          <span>{name} {lastName}</span>     
        </div>
          <ul>
            <Link to={"/myreservations"}>
              <li className='dropdown-item'>Mis Reservas</li>
              <div className='dropdown-icon'><ReservationIcon /></div>
            </Link>
            <Link to={"/myreservations"}>
              <li className='dropdown-item'>Mis favoritos</li>
              <div className='dropdown-icon'><HeartIcon /></div>
            </Link>
            <li className='dropdow-item' onClick={logOut}>Cerrar Sesión</li>
            <div className='dropdown-icon'><CloseIcon /></div>
          </ul>
      </div>
    </div>
  )
}
