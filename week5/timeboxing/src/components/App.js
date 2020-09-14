import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import Error from "./Error";

function App() {
    return (
        <div className="App">
            <Error message = "Something is not working in aplication..">
                <TimeboxList />
                <Error message = "Something is not working in EditableTimebox..">
                    <EditableTimebox />
                </Error>
            </Error>
        </div>
    )
}

export default App;