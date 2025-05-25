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

