const initialState = {
    "timeboxes": [],
    editIndex: null,
    loading: true,
    error: null
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
            return { ...state, loading: false };
        }
        case "ERROR_SET": {
            const { error } = action;
            return { ...state, error };
        }
        default:
            return state;
    }
}

const initialCurrentTimeboxState = {
    isRunning: false,
    isPaused: false,
    pausesCount: 0,
    elapsedTimeInSeconds: 0
};


export function currentTimeboxReducer(state = initialCurrentTimeboxState, action = {}) {
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

