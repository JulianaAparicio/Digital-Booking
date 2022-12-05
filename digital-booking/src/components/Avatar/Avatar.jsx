import React, { createRef, useState } from 'react'
import CloseIcon from '../../shared/Icons/CloseIcon';
import './Avatar.scss';
import { Link } from "react-router-dom";
import HeartIcon from "../../shared/Icons/HeartIcon"
import ReservationIcon from "../../shared/Icons/ReservationIcon"
import gsap from "gsap";


export const Avatar = ({ name, lastName, logOut }) => {

  const optionsMenu = createRef()

  function optionsAppear() {
    gsap.fromTo(optionsMenu.current,{display:"block", opacity:0, yPercent: -50}, {opacity:1, yPercent: 0, duration: 0.1})
  }
  
  function optionsDessapear(){
    gsap.to(optionsMenu.current, {opacity: 0, duration: 0.1, display: "none"})
  }

  return (
    <div className='db-avatar' onMouseLeave={optionsDessapear}>
      <span className='db-avatar-initials' onMouseOver={optionsAppear}>
        {name && name.charAt(0)} {lastName && lastName.charAt(0)}
      </span>
      <div className='db-user-nav'>
        <div className='db-avatar-name'>
          <span>Hola,</span>
          <span>{name} {lastName}</span>     
        </div>
          
      </div>
      <ul className='db-user-options' ref={optionsMenu}>
            <Link to={"/myreservations"}>
              <li className='dropdown-item'>
              <span>Mis Reservas</span>
              <div className='dropdown-icon'><ReservationIcon /></div>
              </li>
            </Link>
            <Link to={"/myreservations"}>
              <li className='dropdown-item'>
              <span>Mis favoritos</span>
              <div className='dropdown-icon'><HeartIcon /></div></li>
              
            </Link>
            <li className='dropdow-item' onClick={logOut}>
              <span>Cerrar Sesión</span>
              <div className='dropdown-icon'><CloseIcon /></div>
            </li>
            
            
          </ul>
    </div>
  )
}
