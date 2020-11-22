import React, { useReducer, useEffect, useContext } from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxesApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";

function useLegacySetState(initialState){
    const stateReducer = (prevState, stateChanges) => {
        let newState = prevState;
        if (typeof stateChanges === "function") {
            newState = stateChanges(prevState)
        } else {
            newState = {
                ...prevState,
                ...stateChanges
            };
        };
        return newState;

    }
    return useReducer(stateReducer, initialState)
}

function TimeboxesManager() {

    const initialState = {
        "timeboxes": [],
        editIndex: null,
        loading: true,
        error: null
    }

    const [state, setState] = useLegacySetState(initialState);

    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => setState({ timeboxes })
        ).catch(
            (error) => setState({ error })
        ).finally(
            () => setState({ loading: false})
        )
    }, [])

    function addTimebox(timebox) {
        TimeboxesAPI.addTimebox(timebox, accessToken).then(
            (addedTimebox) => setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return { timeboxes };
                
            })
        )
    }

    function removeTimebox(indexToRemove) {
        TimeboxesAPI.removeTimebox(state.timeboxes[indexToRemove], accessToken)
            .then(
                () => setState(prevState => {
                    const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
                    return { timeboxes };
                })
            )
    
    }

    function updateTimebox(indexToUpdate, timeboxToUpdate){
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
        .then(
            (updatedTimebox) => setState(prevState => {
                const timeboxes = prevState.timeboxes.map((timebox, index) => 
                    index === indexToUpdate ? updatedTimebox : timebox
                );
                return { timeboxes };
            })
        )
        
    } 

    function handleCreate(createdTimebox){
        try {
            addTimebox(createdTimebox);
        } catch (error) {
            console.log("There is error while creating timebox: ", error);
        }
    }

    function renderTimebox(timebox, index){
        return <>
            {state.editIndex === index ? 
                <TimeboxEditor 
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onUpdate={(udpatedTimebox) => {
                        updateTimebox(index, { ...timebox, ...udpatedTimebox })
                        setState({ editIndex: null})  
                    }} 
                    onCancel={() => setState({ editIndex: null})}
                /> : 
                <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => removeTimebox(index)}
                    onEdit={() => setState({ editIndex: index })} 
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

