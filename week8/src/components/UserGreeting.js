import React from 'react';
import jwt from "jsonwebtoken";


function UserGreeting({accessToken}) {

    return <>Hello {getUserEmail(accessToken)}</>

}
export default UserGreeting;

function getUserEmail(accessToken) {
    const decodedToken = jwt.decode(accessToken);
    return decodedToken.email;
}