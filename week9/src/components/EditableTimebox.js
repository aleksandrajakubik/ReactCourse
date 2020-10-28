import React, { useState } from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

function EditableTimebox(){
    const [title, setTitle] = useState("I'm learning code splitting!");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(10);
    const [isEditable, setIsEditable] = useState(false)



    function handleTitleChange(event){
        setTitle(event.target.value);
    }

    function handleTotalTimeInMinutesChange(event) {
        setTotalTimeInMinutes(event.target.value);
    }

    function handleConfirm(){
        setIsEditable(false);
    }

    function handleEdit() {
        setIsEditable(true);
    }
    return (
        <>
            <React.StrictMode>
                { isEditable ? (
                    <TimeboxEditor 
                        title={title}
                        totalTimeInMinutes={totalTimeInMinutes}
                        isEditable={isEditable}
                        onConfirm={handleConfirm}
                        onTitleChange={handleTitleChange}
                        onTotalTimeInMinutesChange={handleTotalTimeInMinutesChange}
                    />
                ) : (
                    <CurrentTimebox 
                        title={title} 
                        totalTimeInMinutes={totalTimeInMinutes}
                        isEditable={isEditable}
                        onEdit={handleEdit}
                    />
                )}
            </React.StrictMode>
        </>
    )
};

export default EditableTimebox;