import React, { useRef } from "react";

function TimeboxCreator({ onCreate }) {

    const formInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate({
            title: formInput.current[0].value,
            totalTimeInMinutes: formInput.current[1].value
        });
        formInput.current[0].value = "";
        formInput.current[1].value = "";
    }
    
    return (
        <form onSubmit = {handleSubmit} ref = {formInput} className="TimeboxCreator">
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

export default TimeboxCreator;