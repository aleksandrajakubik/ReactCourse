import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";
import { getMinutesAndSecondsFromDurationInSeconds } from "./../lib/time";
import { isTimeboxPaused, isTimeboxRunning, getPausesCount, getElapsedTimeInSeconds } from "../reducers";
import { startTimebox, stopTimebox, setElapsedTimeInSeconds, togglingPause} from "../actions";


function CurrentTimebox({ title, totalTimeInMinutes }) {

    const dispatch = useDispatch();
    const timeboxPaused = useSelector( state => isTimeboxPaused(state.currentTimeboxReducer));
    const timeboxesRunning = useSelector(state => isTimeboxRunning(state.currentTimeboxReducer));
    const pausesCount = useSelector(state => getPausesCount(state.currentTimeboxReducer));
    const elapsedTimeInSeconds = useSelector(state => getElapsedTimeInSeconds(state.currentTimeboxReducer));

    const intervalId = useRef();

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const  [ minutesLeft, secondsLeft ] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);

    const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;


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
        if (timeboxPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }

    return (
        <div className="CurrentTimebox">
            <h1>{title}</h1>
            <Clock minutes = {minutesLeft} seconds = {secondsLeft} className = {timeboxPaused ? "inactive" : ""}/>
            <ProgressBar percent = {progressInPercent} className = {timeboxPaused ? "inactive" : ""}/>
            <button onClick = {handleStart} disabled = {timeboxesRunning}>Start</button>
            <button onClick = {handleStop} disabled = {!timeboxesRunning}>Stop</button>
            <button onClick = {togglePause} disabled = {!timeboxesRunning}>{timeboxPaused ? "Restart" : "Pause"}</button>
            Number of breaks: {pausesCount}
        </div>
    )
};

export default CurrentTimebox;