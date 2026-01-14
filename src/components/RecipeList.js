import { Link, useNavigate } from 'react-router-dom'

//styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {

    const history = useNavigate()

    if (recipes.length === 0) {
        return (
            <>
                <p className="page-title">There are no recipes to show...</p>
                <button onClick={() => history.push('/')}>Back to Home</button>
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
                </div>
            ))}
        </div>
    )
}
