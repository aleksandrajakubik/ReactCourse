import React from "react";
import classNames from "classnames";

function ProgressBar({ className = "", percent, trackRemaining = false}) {
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

export default ProgressBar;