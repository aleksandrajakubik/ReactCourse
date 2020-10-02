import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FetchAuthenticationApi";
import jwt from "jsonwebtoken";

class App extends React.Component {
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
    }

    getUserEmail() {
        const decodedToken = jwt.decode(this.state.accessToken);
        return decodedToken.email;
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
                            <>
                                <header className="header">
                                    Hello {this.getUserEmail()}
                                    <a onClick = {this.handleLogout} className = "header__logout-link" href ="#">Log out</a>
                                </header>
                                <TimeboxList />
                                <ErrorBoundary message = "Something is not working in EditableTimebox..">
                                    <EditableTimebox />
                                </ErrorBoundary>
                            </> : 
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