import "./Header.scss"
import Logo from "../../shared/Logo/Logo";
import { Context } from"../../core/Context"
import { useContext } from "react";
import HeaderButtons from "./HeaderButtons/HeaderButton";
import {Avatar} from "../Avatar/Avatar"

const Header = () => {

    const userContext = useContext(Context);

    const logOut = () => {
        userContext.setUser(null);
        sessionStorage.removeItem("CURRENT_USER");
        window.location.href = "/";
    }

    return (
        <header className="db-header db-header-container">
            <a href="/">
                <Logo />
            </a>
            <div className="db-header-items">
                {userContext && userContext.user ? <Avatar {...userContext.user} logOut={logOut} /> : <HeaderButtons />}
            </div>
        </header>
    )
} 

export default Header;
