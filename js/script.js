let wasteToggleState = 0;
let sugarToggleState = 0;

function displaywaste(){
    const IDS = ["r1", "r3"];
    const divs = document.querySelectorAll('.recipe-item');

    if (wasteToggleState === 0) {
        divs.forEach(div => div.style.display = 'none');
        IDS.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'block';
        });
        wasteToggleState = 1;
    } else {
        divs.forEach(div => div.style.display = 'block');
        wasteToggleState = 0;
    }
}

function displaysugar(){
}

function displaydessert(){}

function displaysavoury(){}

/* diplay or hide nav bar in all */


document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.getElementById("overlay");

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // évite que le clic ferme aussitôt
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

