import React from "react";

function ProgressBar({ className = "", percent, trackRemaining = true}) {
    if (trackRemaining) {
        return (
            <div className={"ProgressBarRemaining " + className} style = {{"--widthA": `${percent}%`}}>
            </div>
        )
    } else {
        return (
            <div className={"ProgressBarDefault " + className} style = {{"--widthA": `${percent}%`}}>
            </div>
        )
    }
}

export default ProgressBar;