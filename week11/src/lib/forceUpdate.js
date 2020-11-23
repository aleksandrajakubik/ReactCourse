import { useState } from "react";

export function useForceUpdate() {
    const [updateCounter, setUpdateCounter] = useState(0);
    function forceUpdate() {
        setUpdateCounter(prevCounter => prevCounter + 1);
    }
    return forceUpdate;
}
