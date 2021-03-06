import makeRequest from "./makeFetchRequest";

const BASE_URL = "http://localhost:4000/timeboxes";
const FetchTimeboxesAPI = {
    getAllTimeboxes: async function(accesToken) {
        const response = await makeRequest(`${BASE_URL}`, "GET", null, accesToken);
        const timeboxes = await response.json();
        return timeboxes;
    },
    addTimebox: async function(timeboxToAdd, accesToken) {
        const response = await makeRequest(`${BASE_URL}`, "POST", timeboxToAdd, accesToken);
        const addedTimebox = await response.json();
        return addedTimebox;
    },
    replaceTimebox: async function(timeboxToReplace, accesToken) {
        if (!timeboxToReplace.id) {
            throw new Error("Timebox has to have an id to be updated!")
        }
        const response = await makeRequest(`${BASE_URL}/${timeboxToReplace.id}`, "PUT", timeboxToReplace, accesToken);
        const replacedTimebox = await response.json();
        return replacedTimebox;
    },
    removeTimebox: async function(timeboxToRemove, accesToken) {
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be removed!")
        }
        await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE", null, accesToken);
    }
}

export default FetchTimeboxesAPI;