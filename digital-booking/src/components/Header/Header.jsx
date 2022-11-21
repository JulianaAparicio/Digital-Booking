import "./Header.scss"
import Logo from "../../shared/Logo/Logo";
import { Context } from"../../core/Context"
import { useContext } from "react";
import HeaderButtons from "./HeaderButtons/HeaderButton";
import {Avatar} from "../Avatar/Avatar"
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../core/services/Auth";

const Header = () => {

    const appContext = useContext(Context);
    const browserNavigate = useNavigate();

    const logOut = () => {
        appContext.setUser(null);
        logoutUser();
        browserNavigate("/");       
    }

    return (
        <header className="db-header db-header-container">
            <a href="/">
                <Logo />
            </a>
            <div className="db-header-items">
                {appContext && appContext.user ? <Avatar {...appContext.user} logOut={logOut} /> : <HeaderButtons />}
            </div>
        </header>
    )
} 

export default Header;
