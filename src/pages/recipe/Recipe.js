import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

// styles
import './Recipe.css'

export default function Recipe({recipes}) {
  const { id } = useParams()
  const url = 'http://localhost:3000/recipes/' + id
  const { data: recipe, isLoading, error} = useFetch(url)
  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook. </p>
          <p>Ingredients:</p>
          <ul>
            {recipe.ingredients.map((ingredient) => 
            <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p>Method: {recipe.method}</p>
        </>
      )}
    </div>
  )
}

// extract route param in recipe component, fetch data with useFetch, output error, loading text and title for each recipe