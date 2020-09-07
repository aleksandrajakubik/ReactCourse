import React from "react";
import { v4 as uuidv4 } from "uuid";

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

export default TimeboxCreator;