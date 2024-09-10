let item;
let imgContainer;
let descriptContainer;
let img;
let span1;
let span2;
let span3;
let span4;
let button;
let petList;

fetchItems();

async function fetchItems() {
  try {
    const response = await fetch("http://localhost:3000/api/pets");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    petList = await response.json();
    // console.log(petList)
    displayListItems(petList);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to display every items on the pet list section

async function displayListItems(list) {
  let itemsContainer = document.querySelector(".pet-list"); //Selects parent container
  itemsContainer.innerHTML = ""; //Empty the parent container

  for (let i = 0; i < list.length; i++) {
    // Creates all the container elements and set their attribute
    item = document.createElement("div");
    item.setAttribute("class", "items");

    imgContainer = document.createElement("div");
    item.append(imgContainer);
    imgContainer.setAttribute("class", "container");

    descriptContainer = document.createElement("div");
    item.append(descriptContainer);
    descriptContainer.setAttribute("class", "descript");

    // Append buttonn to anchor tag
    const anchor = document.createElement("a");
    item.append(anchor);
    anchor.setAttribute("href", "../HTML/clientpetdetails.html");

    button = document.createElement("button");
    anchor.append(button);
    button.setAttribute("id", `${list[i].id}`);
    button.setAttribute("class", "getId");
    button.innerText = `DETAILS`;

    // Append image to its container
    img = document.createElement("img");
    img.setAttribute("src", `${list[i].imagePath}`);
    imgContainer.append(img);

    // Append description
    span1 = document.createElement("span");
    descriptContainer.append(span1);
    span1.innerText = `${list[i].petName}`;

    span2 = document.createElement("span");
    descriptContainer.append(span2);
    span2.innerText = `${list[i].species}`;

    //Append the final created item to items container
    itemsContainer.append(item);

    if (i === list.length - 1) {
      getIdOfPets();
    }
  }
}

// Function to display filtered list

function filterPetList() {
  // Get selected options
  const speciesCheckboxes = document.querySelectorAll(
    '[name ="species"]:checked'
  );
  const ageCheckboxes = document.querySelectorAll('[name ="age"]:checked');
  const genderCheckboxes = document.querySelectorAll(
    '[name ="gender"]:checked'
  );
  const locationCheckboxes = document.querySelectorAll(
    '[name ="location"]:checked'
  );

  // Extract values of selected option
  const species = Array.from(speciesCheckboxes).map(
    (checkbox) => checkbox.value
  );
  const ages = Array.from(ageCheckboxes).map((checkbox) => checkbox.value);
  const genders = Array.from(genderCheckboxes).map(
    (checkbox) => checkbox.value
  );
  const locations = Array.from(locationCheckboxes).map(
    (checkbox) => checkbox.value
  );

  // Filters pet based on selected checkboxes
  const filteredPetList = petList.filter((pet) => {
    if (species.length < 4) {
      const excludeSpecies = [];

      // Add species to exclude if "Other" is selected
      if (species.includes("Other")) {
        if (!species.includes("Dog")) excludeSpecies.push("Dog");
        if (!species.includes("Cat")) excludeSpecies.push("Cat");
        if (!species.includes("Bird")) excludeSpecies.push("Bird");
      }

      // Filter by species
      if (species.length > 0) {
        // Check if species should be excluded or included
        if (excludeSpecies.length > 0 && excludeSpecies.includes(pet.species)) {
          return false;
        } else if (
          excludeSpecies.length === 0 &&
          !species.includes(pet.species)
        ) {
          return false;
        }
      }
    }

    if (ages.length > 0 && !ages.includes(pet.size)) {
      return false;
    }

    if (genders.length > 0 && !genders.includes(pet.gender)) {
      return false;
    }

    if (locations.length > 0 && !locations.includes(pet.location)) {
      return false;
    }

    return true;
  });

  displayListItems(filteredPetList);
}

// Event Listeners for the filter section

const speciesDropdown = document.querySelector(".species-dropdown");
const ageDropdown = document.querySelector(".age-dropdown");
const genderDropdown = document.querySelector(".gender-dropdown");
const locationDropdown = document.querySelector(".location-dropdown");

// Breed section
speciesDropdown.addEventListener("click", () => {
  const specesMenu = ".js-species";
  const speciesIcon = ".species-icon";

  toggleOptions(specesMenu);
  rotateIcon(speciesDropdown, speciesIcon);
});

// age section
ageDropdown.addEventListener("click", () => {
  const ageMenu = ".js-age";
  const ageIcon = ".age-icon";

  toggleOptions(ageMenu);
  rotateIcon(ageDropdown, ageIcon);
});

// gender section
genderDropdown.addEventListener("click", () => {
  const genderMenu = ".js-gender";
  const genderIcon = ".gender-icon";

  toggleOptions(genderMenu);
  rotateIcon(genderDropdown, genderIcon);
});

// location section
locationDropdown.addEventListener("click", () => {
  const locationMenu = ".js-location";
  const locationIcon = ".location-icon";

  toggleOptions(locationMenu);
  rotateIcon(locationDropdown, locationIcon);
});

//Function to toggle options

function toggleOptions(para) {
  let element = document.querySelector(para);
  element.classList.toggle("js-hidden");
}

//Function to rotate the arrow icon

function rotateIcon(parent, child) {
  const arrowIcon = parent.querySelector(child);
  let iconStyle = window.getComputedStyle(arrowIcon);

  if (iconStyle.transform == "none") {
    arrowIcon.style.transform = "rotate(180deg)";
  } else {
    arrowIcon.style.removeProperty("transform");
  }
}

async function getIdOfPets() {
  const petButtons = document.querySelectorAll(".getId");
  petButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const petId = button.getAttribute("id");
      localStorage.setItem("Pet Id", petId);
    });
  });
}

const apply = document.querySelector(".apply-filter");
apply.addEventListener("click", filterPetList);
