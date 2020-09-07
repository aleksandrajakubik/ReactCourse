import React from "react";

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

export default TimeboxEditor;