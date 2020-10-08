import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

function ProgressBar({ className = "", percent, trackRemaining = false, color = null}) {
    let progressClassName = classNames(
        "progress ", 
        className,
        {
            "progress--remaining": trackRemaining,
            "progress--color-green": trackRemaining === false
        }
    );

    return (
        <div className={progressClassName} style = {{"--timePassed": `${percent}%`}}></div>
    )
}

function ProgressBarValidator(props, propName, componentName) {
    if (typeof props[propName] !== "number") {
        return new Error(`Invalid prop '${propName}' issued to component '${componentName}'. It has to be a number.`)
    } if (props[propName] < 0 || props[propName] > 100) {
        return new Error(`Invalid prop '${propName}' issued to component '${componentName}'. It has to be a value between 0 and 100.`)
    }
}


ProgressBar.propTypes = {
    percent: ProgressBarValidator,
    color: PropTypes.oneOf(['red', 'green', 'blue'])
}


export default ProgressBar;