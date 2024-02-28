import {useEffect, useState} from "react"
import NewPlantForm from "./NewPlantForm"
import PlantList from "./PlantList"
import Search from "./Search"
import { v4 as uuidv4} from "uuid"
import { postJSON } from "./Helpers"
import { deleteJSON } from "./Helpers"
import { patchJSON } from "./Helpers"

function PlantPage() {
  const [renderPlants, setRenderPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState('')
  const [idEditingMode, setIdEditingMode] = useState(0)

  const url = 'http://localhost:6001/plants'

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setRenderPlants(data)
      } catch (error) {
        alert(error)
      }
    })()
  }, [])

  const handleEditPlant = (plantToUpdate) => {
    patchJSON(url, idEditingMode, plantToUpdate)
    .then(updatedPlant => setRenderPlants(mostCurrentPlants => mostCurrentPlants.map(plant => plant.id === idEditingMode ? updatedPlant : plant)))
    .then(() => setIdEditingMode(0))
      .catch(err => {  //! This makes the form not clear ... async ?
        setError(console.log(err.text))
        setTimeout(() => setError(""), 5000)    
      })

  }
  const handleChangeEditingMode = (value) => {
    setIdEditingMode(value)
  }

  const handleAddNewPlant = (formData) => {
    // postJSON('http://localhost:6001/plants', formData)
    // .then((addedPlant) => (
    //   setRenderPlants((currentPlants) => {
    //     const lastPlantArray = currentPlants.slice(-1)
    //     const id = lastPlantArray.length
    //     ? Number(lastPlantArray[0].id) + 1
    //     : uuidv4()
    //     return [...currentPlants, { id, ...addedPlant}]
    //   })
    // ))
    // .catch(err => {
    //   setError(err.text)
    //   setTimeout(() => setError(""), 5000)
    //   setRenderPlants(currentPlants => currentPlants.slice(0, -1))
    // })
    const configObj = {
      method: "POST",
      headers: {
          "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(formData)
  }
  return fetch(url, configObj)
      // .then((resp) => {
      //     if (!resp.ok) {
      //         throw new Error("Failed to fetch because server is not running!")
      //     } 
      //     return resp.json()
      //     }
      .then((resp) => resp.json())
      .then((addedPlant) => (
        setRenderPlants((currentPlants) => {
          // const lastPlantArray = currentPlants.slice(-1)
          // const id = lastPlantArray.length
          // ? Number(lastPlantArray[0].id) + 1
          // : uuidv4()
          return [...currentPlants, addedPlant]
        })
  ))
}

  const handleDeletePlant = (id) => {
    const elementToRemove = renderPlants.find(renderPlant => renderPlant.id === id)
    setRenderPlants((currentRenderPlants) => currentRenderPlants.filter((renderPlant) => renderPlant.id !== id))
    deleteJSON(url, id)
      .catch((err) => {
        alert(err)
        setRenderPlants(currentPlants => [...currentPlants, elementToRemove])
      }) 
  }
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <main> {error? alert(error) : null }
      <NewPlantForm handleAddNewPlant={handleAddNewPlant} idEditingMode={idEditingMode} handleEditPlant={handleEditPlant} handleChangeEditingMode={handleChangeEditingMode} />
      <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
      <PlantList renderPlants={renderPlants} searchQuery={searchQuery} handleDeletePlant={handleDeletePlant} handleChangeEditingMode={handleChangeEditingMode}/>
    </main>
  );
}

export default PlantPage;
