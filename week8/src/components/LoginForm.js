import React, { useRef } from "react";

function LoginForm({ onLoginAttempt, errorMessage }) {

    const emailInput = useRef();
    const passwordInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onLoginAttempt({
            email: emailInput.current.value,
            password: passwordInput.current.value,
        });
        emailInput.current.value = "";
        passwordInput.current.value = "";
    }
    
    return (
        <form onSubmit = {handleSubmit} className = "LoginForm">
            { errorMessage ? 
            <div className="LoginForm__error-message">{errorMessage}</div>:
            null
            }
            <label>
                Email:
                <input 
                    ref = {emailInput}
                    type="text" 
                    defaultValue = "alice@example.com"
                />
            </label><br /> 
            <label>
                Password:
                <input 
                    ref = {passwordInput}
                    type="password" 
                    defaultValue = "secret"
                />
            </label><br />
            <button>Log in</button>
        </form>
    )
}

export default LoginForm;