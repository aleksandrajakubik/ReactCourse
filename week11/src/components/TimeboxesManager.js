import React, { useEffect, useContext } from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxesApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import { rootReducer, getAllTimeboxes, areTimeboxesLoading, getTimeboxesLoadingError, isTimeboxEdited } from "../reducers";
import { setTimeboxes, setError, disableLoadingIndicator, addTimebox, replaceTimebox, stopEditingTimebox, removeTimebox, startEditingTimebox } from "../actions";
import { useForceUpdate } from "../lib/forceUpdate";
import { createStore } from "redux";

const store = createStore(rootReducer);

function TimeboxesManager() {
    const forceUpdate = useForceUpdate();
    const state = store.getState().timeboxesReducer;
    const dispatch = store.dispatch;
    useEffect(() => store.subscribe(forceUpdate), []);

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
            {isTimeboxEdited(state, timebox) ? 
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
            { areTimeboxesLoading(state) ? "Timeboxes are loading..." : null}
            { getTimeboxesLoadingError(state) ? "Something went wrong... ": null}
            <ErrorBoundary message = "Ups... Something went wrong in list! :(">
            <TimeboxesList 
                timeboxes={getAllTimeboxes(state)}
                renderTimebox={renderTimebox}
            />
            </ErrorBoundary>
        </>
    )
};


export default TimeboxesManager;

