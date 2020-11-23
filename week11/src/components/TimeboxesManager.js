import React, { useReducer, useEffect, useContext } from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxesApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import { timeboxesReducer } from "../reducers";


function TimeboxesManager() {


    const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);

    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => dispatch({type: "TIMEBOXES_SET", timeboxes })
        ).catch(
            (error) => dispatch({type: "ERROR_SET", error })
        ).finally(
            () => dispatch({ type: "LOADING_INDICATOR_DISABLE"})
        )
    }, [])

    function addTimebox(timebox) {
        TimeboxesAPI.addTimebox(timebox, accessToken).then(
            (addedTimebox) => dispatch({type: "TIMEBOX_ADD", timebox: addedTimebox })
        )
    }

    function removeTimebox(timeboxToRemove) {
        TimeboxesAPI.removeTimebox(timeboxToRemove, accessToken)
            .then(
                () => dispatch({type: "TIMEBOX_REMOVE", removedTimebox: timeboxToRemove })
            )
    
    }

    function updateTimebox(timeboxToUpdate){
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
        .then(
            (replacedTimebox) => dispatch({type: "TIMEBOX_REPLACE", replacedTimebox})
        )
        
    } 

    function handleCreate(createdTimebox){
        try {
            addTimebox(createdTimebox);
        } catch (error) {
            console.log("There is error while creating timebox: ", error);
        }
    }

    function renderTimebox(timebox){
        return <>
            {state.currentlyEditedTimeboxId === timebox.id ? 
                <TimeboxEditor 
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onUpdate={(udpatedTimebox) => {
                        updateTimebox({ ...timebox, ...udpatedTimebox })
                        dispatch({ type: "TIMEBOX_EDIT_STOP"})  
                    }} 
                    onCancel={() => dispatch({ type: "TIMEBOX_EDIT_STOP"})}
                /> : 
                <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => removeTimebox(timebox)}
                    onEdit={() => dispatch({ type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId: timebox.id}) } 
                />
            }
        </>
    }


    return (
        <>
            <TimeboxCreator onCreate = {handleCreate} />
            { state.loading ? "Timeboxes are loading..." : null}
            { state.error ? "Something went wrong... ": null}
            <ErrorBoundary message = "Ups... Something went wrong in list! :(">
            <TimeboxesList 
                timeboxes={state.timeboxes}
                renderTimebox={renderTimebox}
            />
            </ErrorBoundary>
        </>
    )
};


export default TimeboxesManager;

