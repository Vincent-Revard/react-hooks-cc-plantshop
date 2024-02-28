import PlantCard from "./PlantCard"

function PlantList({renderPlants, searchQuery, handleDeletePlant, handleChangeEditingMode}) {


  const plantsFiltered = renderPlants.filter(renderPlant => {
    return (renderPlant.name.toLowerCase()
    .includes(searchQuery.toLowerCase()))
  })

  const RenderFilteredPlants = plantsFiltered.map((plantFiltered => (
    <PlantCard 
    key={plantFiltered.id}
    id={plantFiltered.id}
    {...plantFiltered}
    handleDeletePlant={handleDeletePlant}
    handleChangeEditingMode={handleChangeEditingMode}
    />
  )))

  return (
    <ul className="cards">{RenderFilteredPlants}</ul>
  );
}

export default PlantList;
