import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FetchAuthenticationApi";
import AuthenticatedApp from "./AuthenticatedApp";
import AuthenticationContext from "../contexts/AuthenticationContext";



class App extends React.Component {
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
    }


    handleLoginAttempt = (credentials) => {
        AuthenticationAPI.login(credentials)
            .then( ( {accessToken }) => {
                this.setState({
                    accessToken,
                    previousLoginAttemptFailed: false
                })
            }).catch( () => {
                this.setState({
                    previousLoginAttemptFailed: true
                })
            })
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false
        })
    }

    render() {
        return (
            <div className="App">
                <ErrorBoundary message = "Something is not working in aplication..">
                    {
                        this.isUserLoggedIn() ? 
                            <AuthenticationContext.Provider value={ {accessToken: this.state.accessToken, onLogout: this.handleLogout} }>
                                <AuthenticatedApp />
                            </AuthenticationContext.Provider> : 
                            <LoginForm 
                            errorMessage={this.state.previousLoginAttemptFailed ? "Failed to login" : null}
                                onLoginAttempt={this.handleLoginAttempt}/>
                    }
    
                </ErrorBoundary>
            </div>
        )
    }
}

export default App;