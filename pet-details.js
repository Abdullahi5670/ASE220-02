function getPetIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadPetDetails() {
    const petId = getPetIdFromURL();
    if (!petId) return;

    const response = await fetch("pets.json");
    const pets = await response.json();

    const pet = pets.find(p => p.id == petId);
    if (!pet) return;

    document.getElementById("pet-image").src = pet.image;
    document.getElementById("pet-name").textContent = pet.name;
    document.getElementById("pet-breed").textContent = pet.breed;
    document.getElementById("pet-age").textContent = pet.age;
    document.getElementById("pet-gender").textContent = pet.gender;
    document.getElementById("pet-description").textContent = pet.description;
}

document.addEventListener("DOMContentLoaded", loadPetDetails);
