import { useEffect, useState } from "react";
import { object, string } from 'yup';
// import { Formik } from 'formik'; //! I deeply regret not using this and forgetting it was out there while doing YUP.

const URL = 'http://localhost:6001/plants'

const initialState = {
  name: '',
  image: '',
  price: '',
}
const errorStyle = { color: 'red' , fontWeight: 'bold'}

function NewPlantForm({handleAddNewPlant , idEditingMode, handleEditPlant }) {
  const [formData, setFormData] = useState(initialState)

  const [error, setError] = useState("")
  const [formErrors, setFormErrors] = useState({})

  const plantSchema = object().shape({
    name: string().required('Name is required!'),
    image: string().required('Image is required!'),
    price: string().required('Price is required!')
  })

  useEffect(() => {
    if (idEditingMode) {
      fetch(`${URL}/${idEditingMode}`)
      .then(resp => resp.json())
        .then(data => {
          setFormData(data)
        })
      .catch(err => alert(err))
    }
  }, [idEditingMode])

  const validateForm = async () => {
    try {
      await plantSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors)
      setTimeout(() => setFormErrors(''), 5000)
    }
  }

  const handleFormInputs = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddPlantFormSubmit = (e) => {
    e.preventDefault();
    validateForm(formData)
    plantSchema.validate(formData)
    .then(validFormData => (idEditingMode)? handleEditPlant(validFormData) : handleAddNewPlant(formData))

    .then(() => {
      setFormData(initialState)})
    
    .catch(err => {
        setError('Add/Update Did not work! : ' + err.message)
        setTimeout(() => setError(''), 6000);
    })
}

  return (
    

    <div className="new-plant-form">
      {error ? <p className="error-message red" style={errorStyle} >{error}</p> : null}
      <h2>{idEditingMode ? "Update Existing" : "Add New"} Plant</h2>
      {/* I wanted to add onChange={handleFormInputs} directly to the form but tests were failing */}
      <form onSubmit={handleAddPlantFormSubmit} >
        <input type="text" name="name" value={formData.name} placeholder="Plant name"onChange={handleFormInputs}/>

        <input type="text" name="image" value={formData.image} placeholder="Image URL"onChange={handleFormInputs}/>

        <input type="number" name="price" step="0.01" value={formData.price} placeholder="Price"onChange={handleFormInputs}/>

        <button type="submit">{idEditingMode ? "Update" : "Add"} Plant</button>
      </form>
    </div>

  );
}

export default NewPlantForm;
