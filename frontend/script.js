let blobId = localStorage.getItem("blobId");
let pets = [];

if (!blobId) {
  
  fetch("http://localhost:3000/api/jsonBlob", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([])
  })
    .then(res => res.json())
    .then(data => {
      blobId = data.id;
      localStorage.setItem("blobId", blobId);
      fetchPets();
    });
} else {
  fetchPets();
}

function fetchPets() {
  fetch(`http://localhost:3000/api/jsonBlob/${blobId}`)
    .then(res => res.json())
    .then(data => {
      pets = data;
      displayPets();
    });
}

function displayPets() {
  const list = document.getElementById("petList");
  list.innerHTML = "";
  pets.forEach((pet, index) => {
    const item = document.createElement("li");
    item.textContent = `${pet.name} - ${pet.type} - ${pet.age} years - ${pet.gender}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deletePet(index);
    item.appendChild(delBtn);
    list.appendChild(item);
  });
}

function addPet() {
  const name = prompt("Name:");
  const type = prompt("Type:");
  const age = prompt("Age:");
  const gender = prompt("Gender:");
  pets.push({ name, type, age, gender });
  updateBlob();
}

function deletePet(index) {
  pets.splice(index, 1);
  updateBlob();
}

function updateBlob() {
  fetch(`http://localhost:3000/api/jsonBlob/${blobId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pets)
  }).then(fetchPets);
}
