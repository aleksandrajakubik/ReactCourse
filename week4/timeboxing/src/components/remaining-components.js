import React from "react";
import EditTimebox from "./EditTimebox";


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

