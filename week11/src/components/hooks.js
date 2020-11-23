import { useReducer } from "react";

export function useLegacySetState(initialState) {
    const stateReducer = (prevState, stateChanges) => {
        let newState = prevState;
        if (typeof stateChanges === "function") {
            newState = stateChanges(prevState);
        } else {
            newState = {
                ...prevState,
                ...stateChanges
            };
        };
        return newState;

    };
    return useReducer(stateReducer, initialState);
}
