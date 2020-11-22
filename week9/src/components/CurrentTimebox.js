import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";
import { getMinutesAndSecondsFromDurationInSeconds } from "./../lib/time";
import { useLegacySetState } from "./hooks";

function CurrentTimebox({ title, totalTimeInMinutes }) {

    const initialState = {
        isRunning: false,
        isPaused: false,
        pausesCount: 0,
        elapsedTimeInSeconds: 0
    };

    const [state, setState] = useLegacySetState(initialState);
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
        setState({ isRunning: true})
        startTimer();
    }

    function handleStop(event) {
        setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        });
        stopTimer();
    }

    function startTimer() {
        if (!intervalId.current) {
            intervalId.current = window.setInterval(
                () => {
                    setState(prevState => 
                        { 
                            const elapsedTimeInSeconds =  prevState.elapsedTimeInSeconds + 0.1;
                            return { ...prevState, elapsedTimeInSeconds }
                        })
                }, 
                100
            )
        }
    }

    function stopTimer() {
        window.clearInterval(intervalId.current);
        intervalId.current = null;
    }

    function togglePause() {
        let isPaused;
        setState(
            (prevState) => {
                isPaused = !prevState.isPaused;
                if (isPaused) {
                    stopTimer();
                } else {
                    startTimer();
                }
                return { ...prevState, isPaused }
        })
        setState(prevState => {
            const pausesCount = isPaused ? prevState.pausesCount + 1 : prevState.pausesCount;
            return {...prevState, pausesCount}
        })
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