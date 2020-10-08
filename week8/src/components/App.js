import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FetchAuthenticationApi";
import Header from "./Header";



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
                            <>
                                <Header accessToken={this.state.accessToken} onLogout={this.handleLogout}/>
                                <TimeboxList accessToken={this.state.accessToken}/>
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