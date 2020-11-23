import React, { useReducer, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";
import { getMinutesAndSecondsFromDurationInSeconds } from "./../lib/time";
import { currentTimeboxReducer } from "../reducers";
import { startTimebox, stopTimebox, setElapsedTimeInSeconds, togglingPause} from "../actions";


function CurrentTimebox({ title, totalTimeInMinutes }) {


    const [state, dispatch] = useReducer(currentTimeboxReducer, undefined, currentTimeboxReducer);

    const intervalId = useRef();

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - state.elapsedTimeInSeconds;
    const  [ minutesLeft, secondsLeft ] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);

    const progressInPercent = (state.elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

    useEffect(() => {
        return () => {
            stopTimer()
        }
    }, []);


    function handleStart(event) {
        dispatch(startTimebox())
        startTimer();
    }

    function handleStop(event) {
        dispatch(stopTimebox())
        stopTimer();
    }

    function startTimer() {
        if (!intervalId.current) {
            intervalId.current = window.setInterval(
                () => {dispatch(setElapsedTimeInSeconds())}, 
                100
            )
        }
    }

    function stopTimer() {
        window.clearInterval(intervalId.current);
        intervalId.current = null;
    }

    function togglePause() {
        dispatch(togglingPause())
        if (state.isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }

    return (
        <div className="CurrentTimebox">
            <h1>{title}</h1>
            <Clock minutes = {minutesLeft} seconds = {secondsLeft} className = {state.isPaused ? "inactive" : ""}/>
            <ProgressBar percent = {progressInPercent} className = {state.isPaused ? "inactive" : ""}/>
            <button onClick = {handleStart} disabled = {state.isRunning}>Start</button>
            <button onClick = {handleStop} disabled = {!state.isRunning}>Stop</button>
            <button onClick = {togglePause} disabled = {!state.isRunning}>{state.isPaused ? "Restart" : "Pause"}</button>
            Number of breaks: {state.pausesCount}
        </div>
    )
};

export default CurrentTimebox;