import React from "react";
import PropTypes from "prop-types";

class Timebox extends React.Component {

    render() {
        const { 
            title, 
            totalTimeInMinutes, 
            onDelete, 
            onEdit 
        } = this.props;

        if (totalTimeInMinutes <= 0) {
            throw new Error("Total time must be greater than zero")
        }
        return (
            <div className="Timebox">
                <h3>{title} - {totalTimeInMinutes} min.</h3>
                <button onClick={onDelete} >Delete</button>
                <button onClick={onEdit} >Edit</button>
            </div>
        )
    }
};

Timebox.defaultProps = {
    onDelete: (event) => console.log(event.type),
    onEdit: (event) => console.log(event.type)
}

const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
Timebox.propTypes = {
    title: PropTypes.string.isRequired,
    totalTimeInMinutes: NumberOrStringType.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default Timebox;