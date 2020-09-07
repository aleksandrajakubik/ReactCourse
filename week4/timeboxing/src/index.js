import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import Clock from "./components/Clock"


function TimeboxEditor(props) {
    const { 
        title, 
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onStart,
        onConfirm 
    } = props;
    return (
        <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
            <label>
                What are you doing?
                <input 
                    disabled={!isEditable} 
                    value={title}
                    onChange={onTitleChange}
                    type="text" 
                />
            </label><br /> 
            <label>
                For how many minutes?
                <input 
                    disabled={!isEditable}
                    value={totalTimeInMinutes}
                    onChange={onTotalTimeInMinutesChange}
                    type="text" 
                />
            </label><br />
            <button onClick = {onConfirm} disabled={!isEditable}>Confirm changes</button>
        </div>
    )
}


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

class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePause = this.togglePause.bind(this);
    }
    
    handleStart(event) {
        this.setState({
            isRunning: true
        })
        this.startTimer();
    }

    handleStop(event) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    }

    startTimer() {
        this.intervalId = window.setInterval(
            () => {
                this.setState(
                    (prevState) => ({
                        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
                    })
                )
            }, 
            100
        )
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
    }

    togglePause() {
        this.setState(
            function(prevState) {
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }
            }
        )
    }

    render() {
        const { isPaused, 
            isRunning, 
            pausesCount, 
            elapsedTimeInSeconds 
        } = this.state;
        const { title, 
            totalTimeInMinutes, 
            isEditable, 
            onEdit 
        } = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds / 60);
        const secondsLeft = Math.floor(timeLeftInSeconds % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes = {minutesLeft} seconds = {secondsLeft} className = {isPaused ? "inactive" : ""}/>
                <ProgressBar percent = {progressInPercent} className = {isPaused ? "inactive" : ""}/>
                <button onClick = {onEdit} disabled = {isEditable}>Edit</button>
                <button onClick = {this.handleStart} disabled = {isRunning}>Start</button>
                <button onClick = {this.handleStop} disabled = {!isRunning}>Stop</button>
                <button onClick = {this.togglePause} disabled = {!isRunning}>{isPaused ? "Restart" : "Pause"}</button>
                Number of breaks: {pausesCount}
            </div>
        )
    }
}



class EditableTimebox extends React.Component {
    state = {
        title: "I'm learning to move state up!",
        totalTimeInMinutes: 20,
        isEditable: true
    }


    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleTotalTimeInMinutesChange = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value });
    }

    handleConfirm = () => {
        this.setState({ isEditable: false});
    }

    handleEdit = () => {
        this.setState({ isEditable: true});
    }
    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (
            <>
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onConfirm={this.handleConfirm}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                />
                <CurrentTimebox 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onEdit={this.handleEdit}
                />
            </>
        )
    }
}

class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.formInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onCreate({
            id: uuidv4(),
            title: this.formInput.current[0].value,
            totalTimeInMinutes: this.formInput.current[1].value
        });
        console.log(this.formInput)
        this.formInput.current[0].value = "";
        this.formInput.current[1].value = "";
    }
    
    render() {
        return (
            <form onSubmit = {this.handleSubmit} ref = {this.formInput} className="TimeboxCreator">
                <label>
                    What are you doing?
                    <input 
                        type="text" 
                    />
                </label><br /> 
                <label>
                    For how many minutes?
                    <input 
                        type="text" 
                    />
                </label><br />
                <button>Add timebox</button>
            </form>
        )
    }
}


class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Im learning lists", totalTimeInMinutes: 25 },
            { id: "b", title: "Im learning forms", totalTimeInMinutes: 15 },
            { id: "c", title: "Im learning uncontrolled", totalTimeInMinutes: 10 },

        ]
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) => 
                index === indexToUpdate ? updatedTimebox : timebox
            );
            return { timeboxes };
        })
    } 

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox)
    }

    render() {
        return (
            <>
                <TimeboxCreator onCreate = {this.handleCreate} />
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                        key={timebox.id}
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes} 
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={(newTitle, newTotalTimeInMinutes) => this.updateTimebox(index, {...timebox, title: newTitle, totalTimeInMinutes: newTotalTimeInMinutes})}
                        
                    />
                ))}

            </>
        )
    }
}

class EditTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onEdit(
            this.titleInput.current.value,
            this.totalTimeInMinutesInput.current.value
        );
        this.titleInput.current.value = "";
        this.totalTimeInMinutesInput.current.value = "";
        this.props.hidden();
    }

    render() {
        return (
            <>
                <form onSubmit = {this.handleSubmit} className="EditTimebox">
                    <label>
                        What are you doing?
                        <input 
                            ref={this.titleInput}
                            type="text" 
                        />
                    </label><br /> 
                    <label>
                        For how many minutes?
                        <input 
                            ref={this.totalTimeInMinutesInput}
                            type="text" 
                        />
                    </label><br />
                    <button>Update timebox</button>
                </form>
            </>
        )
    }
}

class Timebox extends React.Component {
    state = {
        isEditable: false
    };

    handleEdit = () => {
        this.setState(
            (prevState) => ({
                        isEditable: !prevState.isEditable
                    })
        )
    }
    render() {
        const { 
            title, 
            totalTimeInMinutes, 
            onDelete, 
            onEdit 
        } = this.props;
        return (
            <div className="Timebox">
                <h3>{title} - {totalTimeInMinutes} min.</h3>
                <button onClick={onDelete} >Delete</button>
                <button onClick={this.handleEdit} >Edit</button>
                {this.state.isEditable ? <EditTimebox hidden={this.handleEdit} onEdit={onEdit}/> : null}
            </div>
        )
    }
}


function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EditableTimebox />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));