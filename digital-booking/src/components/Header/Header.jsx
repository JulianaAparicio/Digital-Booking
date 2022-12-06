import "./Header.scss"
import Logo from "../../shared/Logo/Logo";
import { Context } from"../../core/Context"
import { useContext } from "react";
import HeaderButtons from "./HeaderButtons/HeaderButton";
import {Avatar} from "../Avatar/Avatar"
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../core/services/Auth";
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

const Header = () => {

    const {user, setUser} = useContext(Context);
    const browserNavigate = useNavigate();

    const logOut = () => {
        setUser(null);
        logoutUser();
        browserNavigate("/");       
    }

    return (
        <header className="db-header db-header-container">
            <a href="/">
                <Logo />
            </a>
            <div className="db-header-items">
                {user ? <HeaderAdmin user={user} /> : null}
                {user ? <Avatar {...user} logOut={logOut} /> : <HeaderButtons />}
            </div>
            <HeaderMenu />
        </header>
    )
} 

export default Header;
