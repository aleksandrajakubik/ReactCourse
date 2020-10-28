import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";
import { getMinutesAndSecondsFromDurationInSeconds } from "./../lib/time"

function CurrentTimebox({ title, totalTimeInMinutes, isEditable, onEdit }) {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [pausesCount, setPausesCount] = useState(0);
    const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

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
        setIsRunning(true)
        startTimer();
    }

    function handleStop(event) {
        setIsRunning(false);
        setIsPaused(false);
        setPausesCount(0);
        setElapsedTimeInSeconds(0)
        stopTimer();
    }

    function startTimer() {
        if (!intervalId.current) {
            intervalId.current = window.setInterval(
                () => {
                    setElapsedTimeInSeconds(
                        prevState => prevState + 0.1
                    )
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
        let newIsPaused;
        setIsPaused(
            (prevState) => {
                newIsPaused = !prevState;
                if (newIsPaused) {
                    stopTimer();
                } else {
                    startTimer();
                }
                return newIsPaused
        })
        setPausesCount(prevState => 
            newIsPaused ? prevState+ 1 : prevState
        )
    }

    return (
        <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
            <h1>{title}</h1>
            <Clock minutes = {minutesLeft} seconds = {secondsLeft} className = {isPaused ? "inactive" : ""}/>
            <ProgressBar percent = {progressInPercent} className = {isPaused ? "inactive" : ""}/>
            <button onClick = {onEdit} disabled = {isEditable}>Edit</button>
            <button onClick = {handleStart} disabled = {isRunning}>Start</button>
            <button onClick = {handleStop} disabled = {!isRunning}>Stop</button>
            <button onClick = {togglePause} disabled = {!isRunning}>{isPaused ? "Restart" : "Pause"}</button>
            Number of breaks: {pausesCount}
        </div>
    )
};

export default CurrentTimebox;