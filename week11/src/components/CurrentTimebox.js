import React, { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";
import { getMinutesAndSecondsFromDurationInSeconds } from "./../lib/time";
import { isTimeboxPaused, isTimeboxRunning, getPausesCount, getElapsedTimeInSeconds } from "../reducers";
import { startTimebox, stopTimebox, setElapsedTimeInSeconds, togglingPause} from "../actions";
import { useForceUpdate } from "../lib/forceUpdate";


function CurrentTimebox({ title, totalTimeInMinutes }) {

    const store = useStore();
    const forceUpdate = useForceUpdate();
    const state = store.getState().currentTimeboxReducer;
    const dispatch = store.dispatch;
    useEffect(() => store.subscribe(forceUpdate), []);

    const intervalId = useRef();

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - getElapsedTimeInSeconds(state);
    const  [ minutesLeft, secondsLeft ] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);

    const progressInPercent = (getElapsedTimeInSeconds(state) / totalTimeInSeconds) * 100.0;


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
        if (isTimeboxPaused(state)) {
            startTimer();
        } else {
            stopTimer();
        }
    }

    return (
        <div className="CurrentTimebox">
            <h1>{title}</h1>
            <Clock minutes = {minutesLeft} seconds = {secondsLeft} className = {isTimeboxPaused(state) ? "inactive" : ""}/>
            <ProgressBar percent = {progressInPercent} className = {isTimeboxPaused(state) ? "inactive" : ""}/>
            <button onClick = {handleStart} disabled = {isTimeboxRunning(state)}>Start</button>
            <button onClick = {handleStop} disabled = {!isTimeboxRunning(state)}>Stop</button>
            <button onClick = {togglePause} disabled = {!isTimeboxRunning(state)}>{isTimeboxPaused(state) ? "Restart" : "Pause"}</button>
            Number of breaks: {getPausesCount(state)}
        </div>
    )
};

export default CurrentTimebox;