
// Fetch pet list 

fetchAdminPetList();

addNewPet();

async function fetchAdminPetList() {
  try {
    const response = await fetch('http://localhost:3000/api/adminPetList');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const adminPetList = await response.json();
    console.log(adminPetList);
    populateList(adminPetList);
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}


// Insert new pet details
async function addNewPet() {
  document.getElementById('addPetForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const petName = document.querySelector('#name').value;
    const petSpecies = document.querySelector('#species').value;
    const petBreed = document.querySelector('#breed').value;
    const petAge = document.querySelector('#age').value;
    const petAgeUnit = document.querySelector('#ageUnit').value;
    const petSize = document.querySelector('#size').value;
    const petGender = document.querySelector('#gender').value;
    const petLocation = document.querySelector('#location').value;
    const petDescription = document.querySelector('#description').value;
    const petSpecialNeeds = document.querySelector('#specialNeeds').value;


    const formData = {
      petName: petName,
      species: petSpecies,
      breed: petBreed,
      age: petAge,
      period: petAgeUnit,
      size: petSize,
      gender: petGender,
      location: petLocation,
      description: petDescription,
      adoptionStatus: 'Available',
      specialNeeds: petSpecialNeeds || `NA`,
    };

    const jsonFormData = JSON.stringify(formData);

    try {
      const response = await fetch('http://localhost:3000/api/addNewPet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonFormData
      });
      console.log(jsonFormData);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('Pet added successfully');

    } catch (error) {
      console.error('Error adding pet:', error);
    }
  });
}