import React from "react";

function ProgressBar({ className = "", percent, trackRemaining = false}) {
    let progressClassName = "progress " + className;
    if (trackRemaining) {
        progressClassName += "progress progress--remaining";
    } else {
        progressClassName += "progress progress--color-green"
    }
    return (
        <div className={progressClassName} style = {{"--timePassed": `${percent}%`}}></div>
    )
}

export default ProgressBar;