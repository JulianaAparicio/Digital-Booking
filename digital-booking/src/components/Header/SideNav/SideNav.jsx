import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../core/Context";
import { logoutUser } from "../../../core/services/Auth";
import CloseIcon from "../../../shared/Icons/CloseIcon";
import SocialNetworks from "../../../shared/SocialNetworks/SocialNetworks";
import { Avatar } from "../../Avatar/Avatar";
import './SideNav.scss'

export default function SideNav({close}) {
    const { user, setUser } = useContext(Context); 
    const browserNavigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(true);

    const logOut = () => {
        setUser(null);
        logoutUser();
        browserNavigate("/");       
    }

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
                {user ? <Avatar {...user} logOut={logOut} /> : <h2>Menú</h2>}
                
            </div>
            {!user ? 
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
                :
                <div className="db-side-panel-options">
                    { user.role === 'ADMIN' ? 
                        <> 
                            <Link to={'/administration/products'}>
                                <div className="db-side-panel-options-item" >
                                    Crear Producto
                                </div> 
                            </Link>
                            <Link to={'/administration/users'}>
                                <div className="db-side-panel-options-item" >
                                    Crear Usuario
                                </div>
                            </Link>
                        </> :
                        <> 
                            <Link to={`/booking`}>
                                <div className="db-side-panel-options-item" >
                                    Mis reservas
                                </div> 
                            </Link>
                            <Link to={`/favorites`}>
                                <div className="db-side-panel-options-item" >
                                    Mis Favoritos
                                </div>
                            </Link>
                        </>
                    
                    }
                    
                </div>
            }
            <div className="db-side-panel-footer">
                <div className="db-side-panel-options-item" onClick={logOut}>
                    Cerrar Sesión
                </div>
                <SocialNetworks />
            </div>
        </div>
    )
}