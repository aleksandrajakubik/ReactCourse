import React from "react";

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

export { Timebox }

