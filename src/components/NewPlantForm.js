import { useState } from "react";

function NewPlantForm({handleAddNewPlant}) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
  })

  const handleFormInputs = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddPlantFormSubmit = (e) => {
    e.preventDefault()
    handleAddNewPlant(formData)
    setFormData({
      name: '',
      image: '',
      price: '',
    })
  }


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      {/* Test would not pass with onChange on the form line where I wanted it */}
      <form onSubmit={handleAddPlantFormSubmit}>
        <input type="text" name="name" value={formData.name} placeholder="Plant name" onChange={handleFormInputs}/>
        <input type="text" name="image" value={formData.image} placeholder="Image URL" onChange={handleFormInputs}/>
        <input type="number" name="price" step="0.01" value={formData.price} placeholder="Price" onChange={handleFormInputs}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
