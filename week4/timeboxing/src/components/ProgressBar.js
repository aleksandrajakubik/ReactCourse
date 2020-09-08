import React from "react";

function ProgressBar({ className = "", percent, trackRemaining = false}) {
    if (trackRemaining) {
        return (
            <div className={"progress progress--remaining " + className} style = {{"--timePassed": `${percent}%`}}>
            </div>
        )
    } else {
        return (
            <div className={"progress progress--color-green " + className} style = {{"--timePassed": `${percent}%`}}>
            </div>
        )
    }
}

export default ProgressBar;