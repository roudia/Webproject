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