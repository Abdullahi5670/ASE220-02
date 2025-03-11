let pets = [];
let visiblePets = 9;

// Fetch pets from `pets.json`
async function loadPets() {
    try {
        const response = await fetch("pets.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        pets = await response.json();
        console.log("Pets Loaded:", pets); // Debugging log
        displayPets(0, visiblePets);
    } catch (error) {
        console.error("Error loading pets.json:", error);
    }
}

// Display pets dynamically
function displayPets(start, end) {
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = "";

    pets.slice(start, end).forEach((pet, index) => {
        const petCard = document.createElement("div");
        petCard.classList.add("col");

        petCard.innerHTML = `
            <div class="card shadow">
                <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">${pet.breed} | ${pet.age} years | ${pet.gender}</p>
                    <button class="btn btn-primary" onclick="showDetails(${index})">View Details</button>
                    <button class="btn btn-danger" onclick="deletePet(${index})">Delete</button>
                </div>
            </div>
        `;
        petsContainer.appendChild(petCard);
    });
}

// Show details in Bootstrap modal
function showDetails(index) {
    const pet = pets[index];
    document.getElementById("modal-title").textContent = pet.name;
    document.getElementById("modal-body").innerHTML = `
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>Age:</strong> ${pet.age} years</p>
        <p><strong>Gender:</strong> ${pet.gender}</p>
        <p><strong>Description:</strong> ${pet.description}</p>
    `;
    new bootstrap.Modal(document.getElementById("petModal")).show();
}

// Delete a pet
function deletePet(index) {
    pets.splice(index, 1);
    displayPets(0, visiblePets);
}

// Load More Pets
document.getElementById("load-more").addEventListener("click", () => {
    visiblePets += 9;
    displayPets(0, visiblePets);
});

// Load pets on page load
document.addEventListener("DOMContentLoaded", loadPets);
