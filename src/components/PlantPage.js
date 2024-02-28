import {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { v4 as uuidv4} from "uuid"

function PlantPage() {
  const [renderPlants, setRenderPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  // const [inStock, setInStock] = useState(true)
  const [error, setError] = useState('')
  // .map(plant => ({...plant, inStock: true}))

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then((resp) => resp.json())
    .then(data => setRenderPlants(data))
    .catch(err => {
      setError(err.message)
    })
  }, [])

  const handleAddNewPlant = (formData) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        price: formData.price
      })
    })
    .then(resp => {
      // if (!resp.ok) {
      //   throw new Error("Failed to fetch because server is not running!")
      // }
      return resp.json()
    })
    .then((addedPlant) => {
      setRenderPlants((currentPlants) => {
        const lastPlantArray = currentPlants.slice(-1)
        const id = lastPlantArray.length
        ? Number(lastPlantArray[0].id) + 1
        : uuidv4()
        return [...currentPlants, { id, ...addedPlant}]
      })
    })
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // const handleSwitchInStockButton = () => {
  //   setInStock(currentStockValue => !currentStockValue)
  // }
  // handleSwitchInStockButton={handleSwitchInStockButton} inStock={inStock}
  return (
    <main> {error? alert(error) : null }
      <NewPlantForm handleAddNewPlant={handleAddNewPlant}/>
      <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
      <PlantList renderPlants={renderPlants} searchQuery={searchQuery}/>
    </main>
  );
}

export default PlantPage;
