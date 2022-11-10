import { useEffect, useState} from "react"
import Button from "../../../shared/Button/Button";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import './HeaderButton.scss'

export default function HeaderButtons() {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(true)

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
        <div className="db-header-buttons"> 
            {showRegister ? <a href="register"><Button classList={'db-button-primary-outlined'} >Crear cuenta</Button></a> : null}
            {showLogin ? <a href="login"><Button classList={'db-button-primary-outlined'} >Iniciar sesión</Button></a> : null}
            <HeaderMenu />
        </div>
    )
}

