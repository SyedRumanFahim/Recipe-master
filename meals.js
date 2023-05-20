const loadMeals = (searchText) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

const displayMeals = meals =>{
    //console.log(meals);

    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach(element => {
        console.log(element);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.strMeal}</h5>
                    <p class="card-text ">${(element.strInstructions).slice(0,200)} 
                    <span onclick=loadMealDetails(${element.idMeal}) class="text-primary" data-bs-toggle="modal" data-bs-target="#mealDetails"> ...more</span> </p>
                </div>
            </div>
        `
        mealsContainer.appendChild(mealDiv);

    });
    
}

const searchMeal = () =>{
    const searchText = document.getElementById('search-field').value;
    
    loadMeals(searchText);
}

const loadMealDetails = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]));
}

const displayMealDetails = meals =>{
    const modalLabel = document.getElementById('mealDetailsLabel');
    modalLabel.innerText = meals.strMeal;
    const mealDetailsBody = document.getElementById('mealDetailsBody');
    mealDetailsBody.innerHTML = `
        <img src="${meals.strMealThumb}" class="img-fluid">
        <h3>Instructions</h3>
        <p>${meals.strInstructions}</p>
    `
}
loadMeals('chicken');