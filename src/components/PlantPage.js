import {useEffect, useState, useCallback} from "react"
import NewPlantForm from "./NewPlantForm"
import PlantList from "./PlantList"
import Search from "./Search"
import { useErrorAlerts , postJSON, deleteJSON, patchJSON, addIdPlusOneLastArrayToNewElement as addId , 
findElementToUpdate, pessimisticUpdate, pessimisticDelete } from "./Helpers"

//?I just seen your post about needing to name hooks useHook.... no time to go back now ... but it is absolutely noted!

const errorStyle = { color: 'red' , fontWeight: 'bold', whiteSpace: 'pre-wrap'}

function PlantPage() {
  const [plantsData, setPlantsData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [idEditingMode, setIdEditingMode] = useState(0)
  const [normalError, setNormalError] = useState('')
  const [errorAlerts, setErrorAlerts] = useErrorAlerts('')

  const url = 'http://localhost:6001/plants'

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setPlantsData(data)
      } catch (err){
        setNormalError(`Re-attempt Action: Process Failed.\nIssue: ${err.message}`)
        setTimeout(() => setNormalError(''), 5000)
      }
    })()
  }, []) 

  // No longer afraid of the optimistic updates ... or custom helper function?
  const handleEditPlant = useCallback((plantToUpdate) => {
    const elementToUpdate = findElementToUpdate(plantsData, plantToUpdate) //! (currentsStateVariable, objectToUpdate)
    setPlantsData(pessimisticUpdate(idEditingMode, plantToUpdate)) //! (selectedIdentifier, objectToUpdate)
    patchJSON(url, idEditingMode, plantToUpdate)
      .then(() => setIdEditingMode(0)
      ) 
      .catch((err) => {
        setErrorAlerts(err)
        setPlantsData(currentPlants => currentPlants.slice(0, -1))
        setPlantsData(currentPlants => [...currentPlants, elementToUpdate])
        setIdEditingMode(0)
      })
  },[plantsData, idEditingMode, setErrorAlerts])

  const handleChangeEditingMode = useCallback((value) => {
    setIdEditingMode(value)
  },[])

  const handleAddNewPlant = useCallback((formData) => {
    setPlantsData((currentPlants) => (addId(currentPlants, formData))) //! currentStateVariable, formData
    postJSON(url, formData)
      .catch(err => {
        setErrorAlerts(err)
        setPlantsData(currentPlants => currentPlants.slice(0, -1))
      })
},[setErrorAlerts])

  const handleDeletePlant = useCallback((id) => {
    const elementToDeRender = findElementToUpdate(plantsData, id)
    setPlantsData(pessimisticDelete(plantsData, id)) //! currentsStateVariable, objectToUpdate
    deleteJSON(url, id)
      .catch((err) => {
        setErrorAlerts(err)
        setPlantsData(currentPlants => [...currentPlants, elementToDeRender])
      }) 
  },[setErrorAlerts, plantsData])
  
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value)
  },[])

  return (
    <main>
      <div>{errorAlerts || normalError? <p className="error-message red" style={errorStyle} >{errorAlerts}{normalError}</p> : null}</div> 
      <NewPlantForm handleAddNewPlant={handleAddNewPlant} idEditingMode={idEditingMode} handleEditPlant={handleEditPlant} handleChangeEditingMode={handleChangeEditingMode} />
      <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
      <PlantList plantsData={plantsData} searchQuery={searchQuery} handleDeletePlant={handleDeletePlant} handleChangeEditingMode={handleChangeEditingMode}/>
    </main>
  )
}

export default PlantPage;
