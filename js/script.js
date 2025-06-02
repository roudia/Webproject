let activeFilters = [];

function toggleFilter(button) {
    const filter = button.dataset.filter;

    if (activeFilters.includes(filter)) {
        activeFilters = activeFilters.filter(f => f !== filter); 
        button.classList.remove('active');
    } else {
        activeFilters.push(filter); 
        button.classList.add('active');
    }

    applyFilters();
}

function applyFilters() {
    const items = document.querySelectorAll('.recipe-item');

    items.forEach(item => {
        const itemTypes = item.dataset.type.split(" ");
        const shouldShow = activeFilters.length === 0 ||
                           activeFilters.some(f => itemTypes.includes(f));

        item.style.display = shouldShow ? 'block' : 'none';
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.getElementById("overlay");

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation(); 
    sidebar.classList.add("active");
    overlay.classList.add("visible");
  });

  closeBtn.addEventListener("click", function () {
    closeMenu();
  });

  overlay.addEventListener("click", function () {
    closeMenu();
  });

  function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("visible");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  favoriteButtons.forEach(button => {
    const recipe = button.closest(".recipe-item");
    const recipeId = recipe.dataset.id;
    const title = recipe.dataset.title;
    const img = recipe.dataset.img;
    const ref = recipe.dataset.ref;
    
    if (favorites.some(fav => fav.id === recipeId)) {
      button.classList.add("active");
      button.textContent = "❤";
    }

    button.addEventListener("click", function (e) {
      e.preventDefault();
      favorites = JSON.parse(localStorage.getItem("favorites") || "[]"); // Recharger à chaque clic
      const index = favorites.findIndex(fav => fav.id === recipeId);

      if (index !== -1) {
        favorites.splice(index, 1);
        button.classList.remove("active");
        button.textContent = "♡";
      } else {
        favorites.push({ id: recipeId, title, img, ref });
        button.classList.add("active");
        button.textContent = "❤";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const todoButtons = document.querySelectorAll(".todo-btn");
  let todos = JSON.parse(localStorage.getItem("todos") || "[]");

  todoButtons.forEach(button => {
    const recipe = button.closest(".recipe-item");
    const recipeId = recipe.dataset.id;
    const title = recipe.dataset.title;
    const img = recipe.dataset.img;
    const ref = recipe.dataset.ref;

    if (todos.some(todo => todo.id === recipeId)) {
      button.classList.add("active");
      button.textContent = "★"; 
    } else {
      button.textContent = "☆"; 
    }

    button.addEventListener("click", function (e) {
      e.preventDefault();
      todos = JSON.parse(localStorage.getItem("todos") || "[]");
      const index = todos.findIndex(todo => todo.id === recipeId);

      if (index !== -1) {
        todos.splice(index, 1);
        button.classList.remove("active");
        button.textContent = "☆";  
      } else {
        // add
        todos.push({ id: recipeId, title, img, ref });
        button.classList.add("active");
        button.textContent = "★";  
      }

      localStorage.setItem("todos", JSON.stringify(todos));
    });
  });
});


/* api for searching recipies with leftovers */

async function searchRecipes() {
  const input = document.getElementById("ingredientInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  const apiKey = "00a78620c3e443feaef4bf451ea5cf63"; //i took an exter,al api from spoonacular
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(input)}&number=5&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data)) {
      resultsDiv.innerHTML = "Oh no something didn't work !";
      return;
    }

    resultsDiv.innerHTML = ""; // reset

    data.forEach(recipe => {
      const recipeDiv = document.createElement("div");
      recipeDiv.className = "recipe-item";
      recipeDiv.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; border-radius: 10px;">
        <h3>${recipe.title}</h3>
        <p>Missing ingredients : ${recipe.missedIngredientCount}</p>
        <a href="https://spoonacular.com/recipes/${recipe.title.replaceAll(' ', '-')}-${recipe.id}" target="_blank">See recipy </a>
      `;
      resultsDiv.appendChild(recipeDiv);
    });
  } catch (error) {
    resultsDiv.innerHTML = "Oh no something didn't work !";
    console.error(error);
  }
}

/* newletter subscription message */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("newsletter-message");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // You can add backend or API call here
      message.textContent = "Thank you for subscribing! 🥳";
      form.reset();
    });
  }
});


