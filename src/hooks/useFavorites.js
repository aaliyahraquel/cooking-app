import { useState, useEffect } from 'react'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites)
        setFavorites(parsed)
      }
    } catch (err) {
      console.error('Error loading favorites:', err)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, isLoading])

  const addFavorite = (recipe) => {
    if (!favorites.find(fav => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe])
    }
  }

  const removeFavorite = (recipeId) => {
    setFavorites(favorites.filter(fav => fav.id !== recipeId))
  }

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoading }
}
