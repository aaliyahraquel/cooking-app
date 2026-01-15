import { Link, useNavigate } from 'react-router-dom'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MdDelete } from "react-icons/md";

//styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
    const navigate = useNavigate()
    
    const handleDelete = async (recipeId) => {
      if (window.confirm('Are you sure you want to delete this recipe?')) {
        try {
          console.log('Deleting recipe with ID:', recipeId)
          await deleteDoc(doc(db, 'recipes', recipeId))
          navigate('/')
          console.log('Recipe deleted successfully')
        } catch (err) {
          console.log('Error deleting recipe:', err)
        }
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
                    <div className="delete-icon">       
                        <MdDelete onClick={() => handleDelete(recipe.id)}/>
                    </div>

                </div>
            ))}
        </div>
    )
}
