import {useState} from "react"

function PlantCard({name, image, price, id, handleDeletePlant, handleChangeEditingMode}) {
  const [inStock, setInStock] = useState(true)

  const handleClickInStock = () => setInStock(!inStock)

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleClickInStock}>In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button onClick={() => handleDeletePlant(id)}>Delete Plant Card</button>
      <button onClick={() => handleChangeEditingMode(id)}>Update The Plant Details</button>
    </li>
  );
}

export default PlantCard;
