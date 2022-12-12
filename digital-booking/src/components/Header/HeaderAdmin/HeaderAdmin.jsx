import { Link } from "react-router-dom";
import "./HeaderAdmin.scss";

export default function HeaderAdmin({user}) {
    return (
        <>
            <div className="db-header-admin">
                { user.role === 'ADMIN' ?  
                    <>
                        <Link to={"/administration/products"}>
                            <div>Crear Producto</div>
                        </Link>
                        <Link to={"/administration/users"}>
                            <div>Crear usuario</div>
                        </Link>
                    </> :
                    <>
                        <Link to={`/booking`}>
                            <div>Mis Reservas</div>
                        </Link>
                        <Link to={`/favorites`}>
                            <div>Mis Favoritos</div>
                        </Link>
                    </> 
                }
                
            </div>
        </>
    )
}