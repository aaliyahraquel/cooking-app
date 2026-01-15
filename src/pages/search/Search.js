import RecipeList from '../../components/RecipeList'
import { useFirestore } from '../../hooks/useFirestore'
import { useLocation } from 'react-router-dom'
// styles
import './Search.css'

export default function Search() {

  // finds the current URL of the page. 'search' returns the query string from the url, staring with ?
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString) // provides a way to work with query strings, to retrieve, add etc params
  const query = queryParams.get('q') // gets value of query param

  const { error, isPending, data: recipes } = useFirestore('recipes', query)

  return (
    <div>
      <h2 className="page-title">Recipes including: {query}</h2>
      {error && (<p>{error}</p>)}
      {isPending && (<p className="loading">Loading...</p>)}
      {recipes && <RecipeList recipes={recipes}/>}
    </div>
  )
}
