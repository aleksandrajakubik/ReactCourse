import { v4 as uuidv4 } from "uuid";

function wait(ms=1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}
const timeboxes = [
    { "id": "1", "title": "Im learning promises", "totalTimeInMinutes": 25 },
    { "id": "2", "title": "Im learning REST API", "totalTimeInMinutes": 15 },
    { "id": "3", "title": "Im practising async/await", "totalTimeInMinutes": 25 },
    { "id": "4", "title": "Im learning fetch", "totalTimeInMinutes": 10 },

];

function findIndexByAnId(id) {
    const result = timeboxes.findIndex((timebox) => timebox.id === id);
    if (result < 0){
        throw new Error("Timebox with given id do not exist");
    }
    return result;
}

const FakeTimeboxesAPI = {
    getAllTimeboxes: async function() {
        await wait(1000);
        return [...timeboxes];
    },
    addTimebox: async function(timeboxToAdd) {
        await wait(1000);
        const addedTimebox = {...timeboxToAdd, id: uuidv4() }
        timeboxes.push(addedTimebox);
        return addedTimebox;
    },
    replaceTimebox: async function(timeboxToReplace) {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Cannot replace timebox without and id")
        }
        const index = findIndexByAnId(timeboxToReplace.id)
        const replacedTimebox = {...timeboxToReplace};
        timeboxes[index] = replacedTimebox;
        return replacedTimebox;
    },
    removeTimebox: async function(timeboxToRemove) {
        await wait(1000);
        if (!timeboxToRemove.id) {
            throw new Error("Cannoc remove timebox without an id")
        }
        const index = findIndexByAnId(timeboxToRemove.id);
        timeboxes.splice(index, 1);
    }
}

export default FakeTimeboxesAPI;