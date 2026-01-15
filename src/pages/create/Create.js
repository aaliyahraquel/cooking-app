import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

// styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ingredientsList = ingredients
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0)

    const recipe = {
      title,
      method,
      cookingTime: cookingTime + ' minutes',
      ingredients: ingredientsList
    }

    try {
      console.log('Saving recipe:', recipe)
      const docRef = await addDoc(collection(db, 'recipes'), recipe)
      console.log('Recipe saved with ID:', docRef.id)

      // Reset form
      setTitle('')
      setMethod('')
      setCookingTime('')
      setIngredients('')
      setError(null)

      // Redirect to home page
      navigate('/')
    } catch (err) {
      setError('Failed to add recipe')
      console.log('Error saving recipe:', err)
    }
  }
  
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Ingredients (comma separated):</span>
          <input
            type="text"
            onChange={(e) => setIngredients(e.target.value)}
            value={ingredients}
            placeholder="e.g., 1 Carrot, 1 Leek, 200g Tofu"
            required
          />
        </label>

        <label>
          <span>Cooking TIme (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  )
}
