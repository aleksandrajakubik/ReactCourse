import {combineReducers} from "redux";

const initialState = {
    "timeboxes": [],
    editIndex: null,
    timeboxesAreLoading: true,
    timeboxesLoadingError: null
};
export function timeboxesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case "TIMEBOXES_SET": {
            const { timeboxes } = action;
            return { ...state, timeboxes };
        }
        case "TIMEBOX_ADD": {
            const { timebox } = action;
            const timeboxes = [...state.timeboxes, timebox];
            return { ...state, timeboxes };
        }
        case "TIMEBOX_REMOVE": {
            const { removedTimebox } = action;
            const timeboxes = state.timeboxes.filter(timebox => timebox.id !== removedTimebox.id);
            return { ...state, timeboxes };
        }
        case "TIMEBOX_REPLACE": {
            const { replacedTimebox } = action;
            const timeboxes = state.timeboxes.map(timebox => timebox.id === replacedTimebox.id ? replacedTimebox : timebox);
            return { ...state, timeboxes };
        }
        case "TIMEBOX_EDIT_STOP": {
            return { ...state, currentlyEditedTimeboxId: null };
        }
        case "TIMEBOX_EDIT_START": {
            const { currentlyEditedTimeboxId } = action;
            return { ...state, currentlyEditedTimeboxId };
        }
        case "LOADING_INDICATOR_DISABLE": {
            return { ...state, timeboxesAreLoading: false };
        }
        case "ERROR_SET": {
            const { error } = action;
            return { ...state, timeboxesLoadingError: error };
        }
        default:
            return state;
    }
}

export const getAllTimeboxes = (state) => state.timeboxes;
export const areTimeboxesLoading = (state) => state.timeboxesAreLoading;
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) => state.currentlyEditedTimeboxId && state.currentlyEditedTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) => state.timeboxes.find(timebox => timebox.id === timeboxId);

const initialCurrentTimeboxState = {
    isRunning: false,
    isPaused: false,
    pausesCount: 0,
    elapsedTimeInSeconds: 0
};


function currentTimeboxReducer(state = initialCurrentTimeboxState, action = {}) {
    switch(action.type){
        case 'START': {
            return { ...state, isRunning: true }
        }
        case 'STOP': {
            return {
                ...state,
                isRunning: false,
                isPaused: false,
                pausesCount: 0,
                elapsedTimeInSeconds: 0
            }
        }
        case 'SET_ELAPSED_TIME_IN_SECONDS': {
            const elapsedTimeInSeconds =  state.elapsedTimeInSeconds + 0.1;
            return { ...state, elapsedTimeInSeconds }
        }
        case 'TOGGLE_PAUSE': {
            const isPaused = !state.isPaused;
            const pausesCount = isPaused ? state.pausesCount + 1 : state.pausesCount;
            return { ...state, isPaused, pausesCount }
        }
        default:
            return state
    }
}

export const isTimeboxPaused = (state) => state.isPaused;
export const isTimeboxRunning = (state) => state.isRunning;
export const getPausesCount = (state) => state.pausesCount;
export const getElapsedTimeInSeconds = (state) => state.elapsedTimeInSeconds;

export const rootReducer = combineReducers({ timeboxesReducer, currentTimeboxReducer });
