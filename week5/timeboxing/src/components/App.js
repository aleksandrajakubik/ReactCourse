import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";

function App() {
    return (
        <div className="App">
            <ErrorBoundary message = "Something is not working in aplication..">
                <TimeboxList />
                <ErrorBoundary message = "Something is not working in EditableTimebox..">
                    <EditableTimebox />
                </ErrorBoundary>
            </ErrorBoundary>
        </div>
    )
}

export default App;