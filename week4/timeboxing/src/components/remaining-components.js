import React from "react";
import { v4 as uuidv4 } from "uuid";
import EditableTimebox from "./EditableTimebox";


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

export { EditableTimebox, TimeboxList }
