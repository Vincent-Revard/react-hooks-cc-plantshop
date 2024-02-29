import PlantCard from "./PlantCard"
import { useMemo } from "react"

function PlantList({plantsData, searchQuery, handleDeletePlant, handleChangeEditingMode}) {

  const renderPlants = useMemo(() => plantsData
    .filter(renderPlant => {
    return (renderPlant.name.toLowerCase()
    .includes(searchQuery.toLowerCase().trim
    ()))
    })
    .map((plant => (
    <PlantCard 
    key={plant.id}
    id={plant.id}
    handleDeletePlant={handleDeletePlant}
    handleChangeEditingMode={handleChangeEditingMode}
    {...plant}
    />
    
  )))
  ,[handleDeletePlant,handleChangeEditingMode, plantsData, searchQuery])


  return (
    <ul className="cards">{renderPlants}</ul>
  );
}

export default PlantList;
