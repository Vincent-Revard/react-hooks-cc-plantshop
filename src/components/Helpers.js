
import { v4 as uuidv4} from "uuid"
import { useState } from 'react';

export const postJSON = async (url, formData) => {
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({
            name: formData.name,
            image: formData.image,
            price: formData.price
        })
    }
    const resp = await fetch(url, configObj);
    if (!resp.ok) {
        throw new Error("Failed to fetch because server is not running!");
    }
    return await resp.json();
}

export const patchJSON = async (url, idEditingMode, plantToUpdate) => {
    const resp = await fetch(`${url}/${idEditingMode}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plantToUpdate)
    });
    if (!resp.ok) {
        throw new Error("Failed to fetch because server is not running");
    }
    return await resp.json();
}

export const deleteJSON = async (url, id) => {
    const resp = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!resp.ok) {
        throw new Error('Failed to delete question');
    }
    return await resp.json();
}

export const addIdPlusOneLastArrayToNewElement = (currentStateVariable, formData) => {
    const lastVariableArray = currentStateVariable.slice(-1)
    const id = lastVariableArray.length
    ? Number(lastVariableArray[0].id) + 1
    : uuidv4()
    return [...currentStateVariable, { id, ...formData}]
}

export const pessimisticUpdate = (selectedIdentifier, objectToUpdate) => (mostCurrentStateObject => mostCurrentStateObject.map(object => object.id === selectedIdentifier ? objectToUpdate : object))


export const findElementToUpdate = (currentsStateVariable, objectToUpdate) => {
    const elementToUpdate = (currentsStateVariable.find(currentStateVariable => currentStateVariable.id === objectToUpdate))
    return [elementToUpdate]
}

export const pessimisticDelete = (currentsStateVariable, id) => {
    const elementToDelete = currentsStateVariable.filter((currentStateVariable) => currentStateVariable.id !== id)
    return elementToDelete
}

export const useErrorAlerts = () => {
    const [error, setError] = useState('')
    const includeErrorAlerts = (err) => {
        setError(`Re-attempt Action: Process Failed.\nIssue: ${err.message}`)
        setTimeout(() => setError(''), 5000)
        }
        return [error, includeErrorAlerts]
};