import React, { useReducer, useEffect, useContext } from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxesApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import { timeboxesReducer } from "../reducers";
import { setTimeboxes, setError, disableLoadingIndicator, addTimebox, replaceTimebox, stopEditingTimebox, removeTimebox, startEditingTimebox } from "../actions";

function TimeboxesManager() {


    const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);

    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => dispatch(setTimeboxes(timeboxes))
        ).catch(
            (error) => dispatch(setError(error))
        ).finally(
            () => dispatch(disableLoadingIndicator())
        )
    }, [])

    function handleCreate(createdTimebox){
        try {
            TimeboxesAPI.addTimebox(createdTimebox, accessToken).then(
                (addedTimebox) => dispatch(addTimebox(addedTimebox))
            )
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
                        const timeboxToUpdate = { ...timebox, ...udpatedTimebox }
                        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
                            .then(
                                (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
                            )
                        dispatch(stopEditingTimebox())  
                    }} 
                    onCancel={() => dispatch(stopEditingTimebox())}
                /> : 
                <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => 
                        TimeboxesAPI.removeTimebox(timebox, accessToken)
                            .then(
                                () => dispatch(removeTimebox(timebox))
                            )
                    }
                    onEdit={() => dispatch(startEditingTimebox(timebox.id)) } 
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

