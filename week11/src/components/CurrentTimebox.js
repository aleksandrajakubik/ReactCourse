import React, { useReducer, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";
import { getMinutesAndSecondsFromDurationInSeconds } from "./../lib/time";

const initialState = {
    isRunning: false,
    isPaused: false,
    pausesCount: 0,
    elapsedTimeInSeconds: 0
};


function currentTimeboxReducer(state = initialState, action = {}) {
    switch(action.type){
        case 'START': {
            return { ...state, isRunning: true }
        }
        case 'STOP': {
            return {
                ...state,
                isRunning: false,
                isPaused: false,
                pausesCount: 0,
                elapsedTimeInSeconds: 0
            }
        }
        case 'SET_ELAPSED_TIME_IN_SECONDS': {
            const elapsedTimeInSeconds =  state.elapsedTimeInSeconds + 0.1;
            return { ...state, elapsedTimeInSeconds }
        }
        case 'TOGGLE_PAUSE': {
            const isPaused = !state.isPaused;
            const pausesCount = isPaused ? state.pausesCount + 1 : state.pausesCount;
            return { ...state, isPaused, pausesCount }
        }
    }
}

function CurrentTimebox({ title, totalTimeInMinutes }) {


    const [state, dispatch] = useReducer(currentTimeboxReducer, initialState);

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
        dispatch({ type: 'START'})
        startTimer();
    }

    function handleStop(event) {
        dispatch({ type: 'STOP'})
        stopTimer();
    }

    function startTimer() {
        if (!intervalId.current) {
            intervalId.current = window.setInterval(
                () => {dispatch({ type: 'SET_ELAPSED_TIME_IN_SECONDS' })}, 
                100
            )
        }
    }

    function stopTimer() {
        window.clearInterval(intervalId.current);
        intervalId.current = null;
    }

    function togglePause() {
        dispatch({ type: 'TOGGLE_PAUSE'})
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