export const setTimeboxes = (timeboxes) => ({ type: "TIMEBOXES_SET", timeboxes });
export const setError = (error) => ({ type: "ERROR_SET", error });
export const disableLoadingIndicator = () => ({ type: "LOADING_INDICATOR_DISABLE" });
export const addTimebox = (addedTimebox) => ({ type: "TIMEBOX_ADD", timebox: addedTimebox });
export const removeTimebox = (timebox) => ({ type: "TIMEBOX_REMOVE", removedTimebox: timebox });
export const replaceTimebox = (replacedTimebox) => ({ type: "TIMEBOX_REPLACE", replacedTimebox });
export const stopEditingTimebox = () => ({ type: "TIMEBOX_EDIT_STOP" });
export const startEditingTimebox = (id) => ({ type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId: id });

export const startTimebox = () => ({ type: 'START'});
export const stopTimebox = () => ({ type: 'STOP'});
export const setElapsedTimeInSeconds = () => ({ type: 'SET_ELAPSED_TIME_IN_SECONDS' });
export const togglingPause = () => ({ type: 'TOGGLE_PAUSE'});
