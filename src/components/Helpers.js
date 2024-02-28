
export const postJSON = (url, formData) => {
    const configObj = {
        method: 'POST',
        headers: {
                'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
            name: formData.name,
            image: formData.image,
            price: formData.price
        })
    }
    return fetch(url, configObj)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to fetch because server is not running!")
            } 
            return resp.json()
            }
        )
}

export const patchJSON = (url, idEditingMode, plantToUpdate) => {
    fetch(`${url}${idEditingMode}`, {
        method: "PATCH",
        headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: plantToUpdate.name,
            image: plantToUpdate.image,
            price: plantToUpdate.price
        })
    })
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Failed to fetch because server is not running")
            }else{
                return resp.json()
            }
        })
}

export const deleteJSON = (url, id) => {
    fetch(`${url}${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => {
        if (!resp.ok) {
            throw new Error('Failed to delete question')
        }
        return resp.json()
    })
}