import OpenAi from "openai"
//access my key wotihout mention it in repo and git ignore it in repo
//by setting it in env virable file and accesssing it

export async function getRecipeFromMistral(ingredientsArr) {
  
const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format it nicely as a list so user can read it to follow it `
const ingredientsString = ingredientsArr.join(", "); //?
const openAi=new OpenAi({
  apiKey:import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser:true


}
)
const messages=[{"role":"system","content":SYSTEM_PROMPT},{"role":"user","content":`I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`}]
const response=await openAi.chat.completions.create({
model:"gpt-4",
messages:messages




})

return response.choices[0].message.content

  

}
