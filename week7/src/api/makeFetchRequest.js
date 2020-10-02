async function makeRequest(url, method, body, accesToken) {
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const headers = {
        "Content-Type": "application/json"
    }
    if (accesToken) {
        headers["Authorization"] = `Bearer ${accesToken}`;
    }
    const response = await window.fetch(url, {
    method,
    headers,
    body: jsonBody 
    });
    if (!response.ok) {
        throw new Error("Something went wrong!")
    }
    return response;
}

export default makeRequest;