import React, { useContext } from 'react';
import jwt from "jsonwebtoken";
import AuthenticationContext from '../contexts/AuthenticationContext';


function UserGreeting(props) {

    const { accessToken } = useContext(AuthenticationContext);
    return (
        <>
        Hello {getUserEmail(accessToken)}
        </>
        
    )

}
export default UserGreeting;

function getUserEmail(accessToken) {
    const decodedToken = jwt.decode(accessToken);
    return decodedToken.email;
}