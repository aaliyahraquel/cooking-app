import { Link } from 'react-router-dom'
//styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className="card">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.cookingTime} to make</p>
                    <div>{recipe.method.substring(0,100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                </div>
            ))}
        </div>
    )
}
