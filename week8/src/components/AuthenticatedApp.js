import React from 'react';
import Header from "./Header";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuotes from "./InspirationalQuotes";

function AuthenticatedApp(props) {
    return (
        <>
        <Header />
        <TimeboxList />
        <ErrorBoundary message = "Something is not working in EditableTimebox..">
            <EditableTimebox />
        </ErrorBoundary>
        <InspirationalQuotes />
        </>
    )
}

export default AuthenticatedApp;