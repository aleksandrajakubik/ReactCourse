import React from 'react';
import Header from "./Header";
import TimeboxesManager from "./TimeboxesManager";
import CurrentTimebox from "./CurrentTimebox";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuotesManager from "./InspirationalQuotesManager";
import UserGreeting from "./UserGreeting";
import AuthenticationContext from "../contexts/AuthenticationContext"

function AuthenticatedApp() {
    return (
        <>
        <Header>
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
        </Header>
        <TimeboxesManager />
        <ErrorBoundary message = "Something is not working in EditableTimebox..">
            <CurrentTimebox 
                    title="I'm learning Redux!" 
                    totalTimeInMinutes={0.5}
                />
        </ErrorBoundary>
        <InspirationalQuotesManager />
        </>
    )
}

export default AuthenticatedApp;