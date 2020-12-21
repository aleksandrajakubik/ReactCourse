import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FetchAuthenticationApi";
import AuthenticatedApp from "./AuthenticatedApp";
import AuthenticationContext from "../contexts/AuthenticationContext";



function App(){
    const [login, setLogin] = useState({
        accessToken: null,
        previousLoginAttemptFailed: false
    })

    function isUserLoggedIn() {
        return !!login.accessToken;
    }


    function handleLoginAttempt(credentials) {
        AuthenticationAPI.login(credentials)
            .then( ( {accessToken }) => {
                setLogin({
                    accessToken,
                    previousLoginAttemptFailed: false
                })
            }).catch( () => {
                setLogin({
                    previousLoginAttemptFailed: true
                })
            })
    }

    function handleLogout() {
        setLogin({
            accessToken: null,
            previousLoginAttemptFailed: false
        })
    }

        return (
            <div className="App">
                <ErrorBoundary message = "Something is not working in aplication..">
                    {
                        isUserLoggedIn() ? 
                            <AuthenticationContext.Provider value={ {accessToken: login.accessToken, onLogout: handleLogout} }>
                                <AuthenticatedApp />
                            </AuthenticationContext.Provider> : 
                            <LoginForm 
                            errorMessage={login.previousLoginAttemptFailed ? "Failed to login" : null}
                                onLoginAttempt={handleLoginAttempt}/>
                    }
    
                </ErrorBoundary>
            </div>
        )
}

export default App;