import PlantCard from "./PlantCard"

function PlantList({renderPlants, searchQuery}) {


  const plantsFiltered = renderPlants
  .filter(renderPlant => {
    return (renderPlant.name.toLowerCase()
    .includes(searchQuery.toLowerCase()))
  })

  const RenderFilteredPlants = plantsFiltered.map((plantFiltered => (
    <PlantCard 
    key={plantFiltered.id}
    {...plantFiltered}
    />
  )))

  return (
    <ul className="cards">{RenderFilteredPlants}</ul>
  );
}

export default PlantList;
