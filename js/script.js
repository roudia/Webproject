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


/* gérer les boutons de favoris */

document.addEventListener("DOMContentLoaded", function () {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  favoriteButtons.forEach(button => {
    const recipe = button.closest(".recipe-item");
    const recipeId = recipe.dataset.id;
    const title = recipe.dataset.title;
    const img = recipe.dataset.img;

    
    if (favorites.some(fav => fav.id === recipeId)) {
      button.classList.add("active");
      button.textContent = "❤";
    }

    button.addEventListener("click", function (e) {
      e.preventDefault();
      favorites = JSON.parse(localStorage.getItem("favorites") || "[]"); // Recharger à chaque clic
      const index = favorites.findIndex(fav => fav.id === recipeId);

      if (index !== -1) {
        // Supprimer
        favorites.splice(index, 1);
        button.classList.remove("active");
        button.textContent = "♡";
      } else {
        // Ajouter
        favorites.push({ id: recipeId, title, img });
        button.classList.add("active");
        button.textContent = "❤";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });
});
