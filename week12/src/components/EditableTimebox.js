import React from "react";
import { connect } from "react-redux";
import { isTimeboxEdited } from "../reducers";
import { startEditingTimebox, stopEditingTimebox } from "../actions"
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";

const mapStateToProps = (state, ownProps) => ({
    isEdited: isTimeboxEdited(state.timeboxesReducer, ownProps.timebox)
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const onEdit = () => dispatch(startEditingTimebox(ownProps.timebox.id));
    const onCancel = () => dispatch(stopEditingTimebox());
    return { onEdit, onCancel }
}

export const EditableTimebox = connect(mapStateToProps, mapDispatchToProps)(function EditableTimebox({ isEdited, timebox, onEdit, onCancel, onUpdate, onDelete }) {
    return <>
        {isEdited ?
            <TimeboxEditor
                initialTitle={timebox.title}
                initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                onUpdate={onUpdate}
                onCancel={onCancel} /> :
            <Timebox
                key={timebox.id}
                title={timebox.title}
                totalTimeInMinutes={timebox.totalTimeInMinutes}
                onDelete={onDelete}
                onEdit={onEdit} />}
    </>;
})
