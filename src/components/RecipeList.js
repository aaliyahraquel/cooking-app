import { Link, useNavigate } from 'react-router-dom'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MdDelete } from "react-icons/md"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useFavorites } from '../hooks/useFavorites'

//styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
    const navigate = useNavigate()
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    
    const handleDelete = async (recipeId) => {
      if (window.confirm('Are you sure you want to delete this recipe?')) {
        try {
          await deleteDoc(doc(db, 'recipes', recipeId))
          navigate('/')
        } catch (err) {
          console.log('Error deleting recipe:', err)
        }
      }
    }

    const handleFavorite = (recipe) => {
      if (isFavorite(recipe.id)) {
        removeFavorite(recipe.id)
      } else {
        addFavorite(recipe)
      }
    }

    if (recipes.length === 0) {
        return (
            <>
                <p className="page-title">There are no recipes to show...</p>
            </>
        )
    }

    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className="card">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.cookingTime} to make</p>
                    <div>{recipe.method.substring(0,100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                    <div className="card-icons">
                        <div className="heart-icon" onClick={() => handleFavorite(recipe)}>
                            {isFavorite(recipe.id) ? 
                                <AiFillHeart /> : 
                                <AiOutlineHeart />
                            }
                        </div>
                        <div className="delete-icon">       
                            <MdDelete onClick={() => handleDelete(recipe.id)}/>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}
