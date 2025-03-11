// Load pet data and insert it into the main page
async function loadPets() {
    const response = await fetch("pets.json");
    const pets = await response.json();
    
    const petsContainer = document.getElementById("pets-container");

    pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.classList.add("col");

        petCard.innerHTML = `
            <div class="card">
                <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">${pet.breed} | ${pet.age} years | ${pet.gender}</p>
                    <a href="pet-details.html?id=${pet.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;

        petsContainer.appendChild(petCard);
    });
}

// Load pets on page load
document.addEventListener("DOMContentLoaded", loadPets);
