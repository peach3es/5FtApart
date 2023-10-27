const BASE_URL = "http://localhost:3000"

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users`)
    const json = await response.json()

    return json;
}


export const getUser = async(userID) => {
    const response  = await fetch(`${BASE_URL}/api/users/${userID}`)
    const json = await response.json();

    if(json) return json
    return {}
}

//Posting a new Broker
export async function addUser(formData){

    try {
        const Options = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}/api/users`, Options)
        const json = await response.json();

        return json;

    } catch(error) {

        return error;
    }

}

//Update a new Broker
export async function updateUser(userID, formData){
    const Options = {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}/api/users/?userID=${userID}`, Options)
    const json = await response.json()
    return json;
}

//Delete a new Broker
export async function deleteUser(userID){
    const Options = {
        method: 'DELETE',
        headers: {'Content-Type': "application/json"},
    }

    const response = await fetch(`${BASE_URL}/api/users/?userID=${userID}`, Options)
    const json = await response.json()
    return json;

}

// For Properties

export const getProperties = async () => {
    const response = await fetch(`${BASE_URL}/api/property`)
    const json = await response.json()

    return json;
}

export const getProperty = async(propertyID) => {
    const response  = await fetch(`${BASE_URL}/api/property/${propertyID}`)
    const json = await response.json();

    if(json) return json
    return {}
}

//Posting a new Property
export async function addProperty(formData){

    try {
        const Options = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}/api/property`, Options)
        const json = await response.json();

        return json;

    } catch(error) {

        return error;
    }

}

//Update a new Property
export async function updateProperty(propertyID, formData){
    const Options = {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}/api/property/?propertyID=${propertyID}`, Options)
    const json = await response.json()
    return json;
}

//Delete a new Property
export async function deleteProperty(propertyID){
    const Options = {
        method: 'DELETE',
        headers: {'Content-Type': "application/json"},
    }

    const response = await fetch(`${BASE_URL}/api/property/?propertyID=${propertyID}`, Options)
    const json = await response.json()
    return json;
}