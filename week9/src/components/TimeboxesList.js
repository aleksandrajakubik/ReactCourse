import React from "react";
import Timebox from "./Timebox";

export function TimeboxesList({ timeboxes, onTimeboxDelete, onTimeboxEdit }) {
    return timeboxes.map((timebox, index) => (
        <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => onTimeboxDelete(index)}
            onEdit={(newTitle, newTotalTimeInMinutes) => onTimeboxEdit(index, { ...timebox, title: newTitle, totalTimeInMinutes: newTotalTimeInMinutes })} />
    ));
}
