import React, { useState } from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

function EditableTimebox(){
    const [timebox, setTimebox] =useState({
        title: "I'm learning code splitting!",
        totalTimeInMinutes: 20,
        isEditable: false
    })


    function handleTitleChange(event){
        setTimebox({ title: event.target.value });
    }

    function handleTotalTimeInMinutesChange(event) {
        setTimebox({ totalTimeInMinutes: event.target.value });
    }

    function handleConfirm(){
        setTimebox({ isEditable: false});
    }

    function handleEdit() {
        setTimebox({ isEditable: true});
    }
    return (
        <>
            <React.StrictMode>
                { timebox.isEditable ? (
                    <TimeboxEditor 
                        title={timebox.title}
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        isEditable={timebox.isEditable}
                        onConfirm={() => handleConfirm}
                        onTitleChange={() => handleTitleChange}
                        onTotalTimeInMinutesChange={() => handleTotalTimeInMinutesChange}
                    />
                ) : (
                    <CurrentTimebox 
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        isEditable={timebox.isEditable}
                        onEdit={() => handleEdit}
                    />
                )}
            </React.StrictMode>
        </>
    )
};

export default EditableTimebox;