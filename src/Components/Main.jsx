import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {getRecipeFromMistral} from "./Ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipeShown, setRecipeShown] = React.useState(false)
        const[markup,setMarkup]=React.useState("")

   async function toggleRecipeShown() {
    console.log("toggleRecipeShown function to activate and go to the api")
        setRecipeShown(prevShown => !prevShown)
        setMarkup(await getRecipeFromMistral(ingredients))
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                />
            }

            {recipeShown && <ClaudeRecipe

            recipeMarkup={markup}
            
            
            />}
        </main>
    )
}