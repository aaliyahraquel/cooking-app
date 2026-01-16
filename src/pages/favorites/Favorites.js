import { useFavorites } from '../../hooks/useFavorites'
import RecipeList from '../../components/RecipeList'

// styles
import './Favorites.css'

export default function Favorites() {
  const { favorites, isLoading } = useFavorites()

  if (isLoading) {
    return <div className="page-title">Loading...</div>
  }

  return (
    <div className="favorites">
      <h1 className="page-title">Your Favorites</h1>
      {favorites && favorites.length > 0 && (
        <p style={{textAlign: 'center', color: '#999', marginBottom: '20px'}}>You have {favorites.length} favorite recipe{favorites.length !== 1 ? 's' : ''}</p>
      )}
      <RecipeList recipes={favorites || []} />
    </div>
  )
}
