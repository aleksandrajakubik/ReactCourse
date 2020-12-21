import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxesApi"
import AuthenticationContext from "../contexts/AuthenticationContext";
import { AllTimeboxesList } from "./TimeboxesList";
import { areTimeboxesLoading, getTimeboxesLoadingError } from "../reducers";
import { fetchAllTimeboxes ,addTimebox, replaceTimebox, stopEditingTimebox, removeTimeboxRemotely } from "../actions";
import { EditableTimebox } from "./EditableTimebox";

function TimeboxesManager() {

    const dispatch = useDispatch();
    const timeboxesLoading = useSelector(areTimeboxesLoading);
    const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);

    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        dispatch(fetchAllTimeboxes(accessToken))
    }, [])

    function handleCreate(createdTimebox) {
        try {
            TimeboxesAPI.addTimebox(createdTimebox, accessToken).then(
                (addedTimebox) => dispatch(addTimebox(addedTimebox))
            )
        } catch (error) {
            console.log("There is error while creating timebox: ", error);
        }
    }

    function renderTimebox(timebox) {
        const onUpdate = (udpatedTimebox) => {
            const timeboxToUpdate = { ...timebox, ...udpatedTimebox }
            TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
                .then(
                    (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
                )
            dispatch(stopEditingTimebox())
        }
        const onDelete = () => dispatch(removeTimeboxRemotely(timebox, accessToken));
        return <EditableTimebox
            timebox={timebox}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />

    }

    return (
        <>
            <TimeboxCreator onCreate={handleCreate} />
            { timeboxesLoading ? "Timeboxes are loading..." : null}
            { timeboxesLoadingError ? "Something went wrong... " : null}
            <ErrorBoundary message="Ups... Something went wrong in list! :(">
                <AllTimeboxesList
                    renderTimebox={renderTimebox}
                />
            </ErrorBoundary>
        </>
    )
};


export default TimeboxesManager;

