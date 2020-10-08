import React from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import UserGreeting from "./UserGreeting";

function Header(props) {
    return (
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
    )
}

export default Header;