import React from "react";
import PropTypes from "prop-types";

function isLengthEqual1(stringToCheck) {
    let newString = stringToCheck;
    return newString.length === 1 ? newString = '0' + newString : newString;

}

function hoursValidation(hour) {
    if (hour < 0){
        return String(0);
    } else if (hour > 23) {
        return String(23);
    } else {
        return String(hour);
    }
};


function minutesAndSecondsValidation(time) {
    if (time < 0) {
        return '00'
    } else if (time > 59) {
        return '59'
    } else {
        return String(time);
    }
};

function milisecondsValidation(miliseconds) {
    if (miliseconds < 0) {
        return '000'
    } else if (miliseconds > 999) {
        return '999'
    } else {
        let newMiliseconds = String(miliseconds);
        return newMiliseconds.length === 1 ? newMiliseconds = '00' + newMiliseconds : newMiliseconds.length === 2 ? newMiliseconds = '0' + newMiliseconds : newMiliseconds;
    }
}

function Clock({ className, hours, minutes, seconds, miliseconds}) {
    let newHours = isLengthEqual1(hoursValidation(hours));
    let newMinutes = isLengthEqual1(minutesAndSecondsValidation(minutes));
    let newSeconds = isLengthEqual1(minutesAndSecondsValidation(seconds));
    let newMiliseconds = milisecondsValidation(miliseconds);

    return (
        <h2 className = {"Clock " + className}>Time left: 
        <span className = "Clock__hours">{newHours}</span>
        <span className = "Clock__separator">:</span>
        <span className = "Clock__minutes">{newMinutes}</span>
        <span className = "Clock__separator">:</span>
        <span className = "Clock__seconds">{newSeconds}</span>.
        <span className = "Clock__miliseconds">{newMiliseconds}</span></h2>
    )
}

Clock.defaultProps = {
     className: "",
     hours: 0,
     miliseconds: 0
}

// function NonNegativeNumberType(props, propName, componentName) {
//     if (props[propName] < 0) {
//         return new Error(`Invalid prop '${propName}' issued to component '${componentName}'. It as to be greater or equal to 0.`)
//     }
// }

const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
Clock.propTypes = {
    className: PropTypes.string.isRequired,
    hours: NumberOrStringType.isRequired,
    minutes: NumberOrStringType.isRequired,
    seconds: NumberOrStringType.isRequired,
    miliseconds: NumberOrStringType.isRequired
}

export default Clock;
