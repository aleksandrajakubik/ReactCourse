import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticationContext from '../contexts/AuthenticationContext';
import UserGreeting from "./UserGreeting";

const headerRoot = document.getElementById("header")
function Header(props) {
    return ReactDOM.createPortal(
        <header className="header">
            <UserGreeting />
            <AuthenticationContext.Consumer>
            {
                ({onLogout}) => (
                    <a 
                    onClick = {onLogout} 
                    className = "header__logout-link" 
                    href ="#"
                    >
                        Log out
                    </a>
                )
            }
            </AuthenticationContext.Consumer>
        </header> 
    , headerRoot)
}

export default Header;