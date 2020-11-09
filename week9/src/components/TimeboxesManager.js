import React, { useState, useEffect, useContext } from "react";

import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxesApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";


function TimeboxesManager() {
    const [timeboxes, setTimeboxes] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const { accessToken } = useContext(AuthenticationContext)

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => setTimeboxes(timeboxes)
        ).catch(
            (error) => setError(error)
        ).finally(
            () => setLoading(false)
        )
    }, [])

    function addTimebox(timebox) {
        TimeboxesAPI.addTimebox(timebox, accessToken).then(
            (addedTimebox) => setTimeboxes(prevTimeboxes => {
                const timeboxes = [...prevTimeboxes, addedTimebox];
                return timeboxes;
                
            })
        )
    }

    function removeTimebox(indexToRemove) {
        TimeboxesAPI.removeTimebox(timeboxes[indexToRemove], accessToken)
            .then(
                () => setTimeboxes(prevTimeboxes => {
                    const timeboxes = prevTimeboxes.filter((timebox, index) => index !== indexToRemove);
                    return timeboxes;
                })
            )
    
    }

    function updateTimebox(indexToUpdate, timeboxToUpdate){
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
        .then(
            (updatedTimebox) => setTimeboxes(prevTimeboxes => {
                const timeboxes = prevTimeboxes.map((timebox, index) => 
                    index === indexToUpdate ? updatedTimebox : timebox
                );
                return timeboxes;
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
            {editIndex === index ? 
                <TimeboxEditor 
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onUpdate={(udpatedTimebox) => {
                        updateTimebox(index, { ...timebox, ...udpatedTimebox })
                        setEditIndex(null)  
                    }} 
                    onCancel={() => setEditIndex(null)}
                /> : 
                <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => removeTimebox(index)}
                    onEdit={() => setEditIndex(index)} 
                />
            }
        </>
    }


    return (
        <>
            <TimeboxCreator onCreate = {handleCreate} />
            { loading ? "Timeboxes are loading..." : null}
            { error ? "Something went wrong... ": null}
            <ErrorBoundary message = "Ups... Something went wrong in list! :(">
            <TimeboxesList 
                timeboxes={timeboxes}
                renderTimebox={renderTimebox}
            />
            </ErrorBoundary>
        </>
    )
};


export default TimeboxesManager;

