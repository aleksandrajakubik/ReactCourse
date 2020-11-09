import React from 'react';
import Header from "./Header";
import TimeboxesManager from "./TimeboxesManager";
import CurrentTimebox from "./CurrentTimebox";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuotesManager from "./InspirationalQuotesManager";

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
                    title="I'm learning code splitting!" 
                    totalTimeInMinutes={10}
                />
        </ErrorBoundary>
        <InspirationalQuotesManager />
        </>
    )
}

export default AuthenticatedApp;