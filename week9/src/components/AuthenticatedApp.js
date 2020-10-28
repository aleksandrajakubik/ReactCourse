import React from 'react';
import Header from "./Header";
import TimeboxesManager from "./TimeboxesManager";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuotesManager from "./InspirationalQuotesManager";

function AuthenticatedApp(props) {
    return (
        <>
        <Header />
        <TimeboxesManager />
        <ErrorBoundary message = "Something is not working in EditableTimebox..">
            <EditableTimebox />
        </ErrorBoundary>
        <InspirationalQuotesManager />
        </>
    )
}

export default AuthenticatedApp;