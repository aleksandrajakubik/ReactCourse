import React, { useRef } from "react";

function TimeboxEditor({ onCancel, onUpdate, initialTitle, initialTotalTimeInMinutes }) {

    const formInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate({
            title: formInput.current[0].value,
            totalTimeInMinutes: formInput.current[1].value
        });
        resetToInitialValues();
    }

    const handleCancel = () => {
        resetToInitialValues();
        onCancel()
    }

    function resetToInitialValues() {
        formInput.current[0].value = initialTitle;
        formInput.current[1].value = initialTotalTimeInMinutes;
    }
    
    return (
        <form onSubmit = {handleSubmit} ref = {formInput} className="TimeboxEditor">
            <label>
                What are you doing?
                <input 
                    type="text" 
                    defaultValue={initialTitle}
                />
            </label><br /> 
            <label>
                For how many minutes?
                <input 
                    type="text" 
                    defaultValue={initialTotalTimeInMinutes}
                />
            </label><br />
            <a onClick = {handleCancel}>Cancel</a>
            <button>Confirm changes</button>
        </form>
    )
}

export default TimeboxEditor;