import React from "react";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Im learning lists", totalTimeInMinutes: 25 },
            { id: "b", title: "Im learning forms", totalTimeInMinutes: 15 },
            { id: "c", title: "Im learning uncontrolled", totalTimeInMinutes: 10 },

        ]
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
        this.addTimebox(createdTimebox)
    }

    render() {
        return (
            <>
                <TimeboxCreator onCreate = {this.handleCreate} />
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                        key={timebox.id}
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes} 
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={(newTitle, newTotalTimeInMinutes) => this.updateTimebox(index, {...timebox, title: newTitle, totalTimeInMinutes: newTotalTimeInMinutes})}
                        
                    />
                ))}

            </>
        )
    }
};

export default TimeboxList;