const searchBtn = document.querySelector('.Searchbtn');
const searchBox = document.querySelector('.input');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetails = document.querySelector('.recipe-details-content');
const CloseBtn = document.querySelector('.recipe-close-btn');




// ye function hume recipes  laake degaa hume
const fetchRecipes = async(query) =>

    
       {

       recipeContainer.innerHTML = "<h2>Fetching Recipes </h2>";
       try {
     const data =   await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s= ${query}`);
     const  response = await data.json();
    
     recipeContainer.innerHTML = " ";
     response.meals.forEach(meal =>{
        console.log(meal);
       const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>


        `
     const button = document.createElement('button');
     button.textContent = "View Recipe";
     
     recipeDiv.appendChild(button);
    // adding event Listener to button
    button.addEventListener ( 'click' ,() => {
 
        openRecipePopup(meal);

        

    });

     recipeContainer.appendChild(recipeDiv);
     });
    }
    catch(error){
      recipeContainer.innerHTML = "<h2>Error in fetching recipes </h2>";
    }
}
  const fetchIngredients = (meal) =>{
    let IngredientList= "";
    for (let i =1 ; i<=20 ; i++)
      {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
          const measure = meal[`strMeasure${i}`];
          IngredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
          break;
        }
      }
        return IngredientList;
      

  }


 const openRecipePopup = (meal) =>{
   
    recipeDetails.innerHTML = `
    <h2 class ="recipeName">${meal.strMeal} </h2>
    <h3>Ingredients:</h3>
     <ul class ="IngredientsList">${fetchIngredients(meal)}</ul>
     <div class = "recipeInstructions">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
     </div>`

    recipeDetails.parentElement.style.display = "block";

 }
searchBtn.addEventListener('click' , (e) =>
{
    e.preventDefault();
    const searchInput  = searchBox.value.trim();
    fetchRecipes(searchInput);

})




CloseBtn.addEventListener ('click', () =>
{

  recipeDetails.parentElement.style.display = "none";


})