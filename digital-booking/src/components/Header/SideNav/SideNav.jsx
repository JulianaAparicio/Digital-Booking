import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "../../../shared/Icons/CloseIcon";
import SocialNetworks from "../../../shared/SocialNetworks/SocialNetworks";
import './SideNav.scss'

export default function SideNav({close}) {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(true);

    useEffect(() => {
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('login')) {
            setShowLogin(false);
            setShowRegister(true);
        } else if (currentPage.includes('register')) {
            setShowRegister(false);
            setShowLogin(true);
        } else {
            setShowRegister(true);
            setShowLogin(true);
        }
    },[])


    return (
        <div className="db-side-panel">
            <div className="db-side-panel-header">
                <div onClick={close}>
                    <CloseIcon/>
                </div>
                <h2>Menú</h2>
            </div>
            <div className="db-side-panel-options">
                { showRegister ? 
                    <Link to={'/register'}>
                        <div className="db-side-panel-options-item" >
                            Crear Cuenta
                        </div> 
                    </Link> : null }
                { showLogin ?
                    <Link to={'/login'}>
                        <div className="db-side-panel-options-item" >
                            Iniciar Sesión
                        </div>
                    </Link> : null
                }
            </div>
            <div className="db-side-panel-footer">
                <SocialNetworks />
            </div>
        </div>
    )
}