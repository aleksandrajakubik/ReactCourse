import React from "react";

import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import ErrorBoundary from "./ErrorBoundary";


class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { "id": "1", "title": "Im learning promises", "totalTimeInMinutes": 25 },
            { "id": "2", "title": "Im learning REST API", "totalTimeInMinutes": 15 },
            { "id": "3", "title": "Im practising async/await", "totalTimeInMinutes": 25 },
            { "id": "4", "title": "Im learning fetch", "totalTimeInMinutes": 10 },

        ],
        hasError: false
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) => 
                index === indexToUpdate ? updatedTimebox : timebox
            );
            return { timeboxes };
        })
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

export default TimeboxList;