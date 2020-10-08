import React from "react";

import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/FetchTimeboxesApi"
import AuthenticationContext from "../contexts/AuthenticationContext";


class TimeboxList extends React.Component {
    state = {
        "timeboxes": [],
        loading: true,
        error:null,
        hasError: false
    }

    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes(this.context.accessToken).then(
            (timeboxes) => this.setState({ timeboxes })
        ).catch(
            (error) => this.setState({ error })
        ).finally(
            () => this.setState({ loading: false })
        )
    }

    addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, this.context.accessToken).then(
            (addedTimebox) => this.setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return { timeboxes };
                
            })
        )
    }

    removeTimebox = (indexToRemove) => {
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove], this.context.accessToken)
            .then(
                () => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
                    return { timeboxes };
                })
            )
    
    }

    updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, this.context.accessToken)
        .then(
            (updatedTimebox) => this.setState(prevState => {
                const timeboxes = prevState.timeboxes.map((timebox, index) => 
                    index === indexToUpdate ? updatedTimebox : timebox
                );
                return { timeboxes };
            })
        )
        
    } 

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox);
        } catch (error) {
            console.log("There is error while creating timebox: ", error);
        }
    }

    render() {
        return (
            <>
                <TimeboxCreator onCreate = {this.handleCreate} />
                { this.state.loading ? "Timeboxes are loading..." : null}
                { this.state.error ? "Something went wrong... ": null}
                <ErrorBoundary message = "Ups... Something went wrong in list! :(">
                {  
                    this.state.timeboxes.map((timebox, index) => (
                        <Timebox 
                            key={timebox.id}
                            title={timebox.title} 
                            totalTimeInMinutes={timebox.totalTimeInMinutes} 
                            onDelete={() => this.removeTimebox(index)}
                            onEdit={(newTitle, newTotalTimeInMinutes) => this.updateTimebox(index, {...timebox, title: newTitle, totalTimeInMinutes: newTotalTimeInMinutes})}
                            
                        />
                ))}
                </ErrorBoundary>

            </>
        )
    }
};

TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;