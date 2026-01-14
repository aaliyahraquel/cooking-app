import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const recipe = { title, method, cookingTime }

    try {
      const response = await fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      })

      if (!response.ok) {
        throw new Error('Failed to add recipe')
      }

      // Reset form
      setTitle('')
      setMethod('')
      setCookingTime('')
      setError(null)

      // Redirect to home page
      navigate('/')
    } catch (err) {
      setError(err.message)
      console.log(err)
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
