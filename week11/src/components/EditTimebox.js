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
};

export default EditTimebox;
