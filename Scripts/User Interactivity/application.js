
let id3;
let data = null


insertFormData();

idOfPets()

fetchData(id3)

function insertFormData() {
  document.getElementById('applicationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const formData = {
      fullName: document.getElementById('full-name').value,
      identificationId: document.getElementById('identification-id').value,
      occupation: document.getElementById('occupation').value,
      address: document.getElementById('address').value,
      yearsResided: document.getElementById('years_resided').value,
      bestTimeToCall: document.getElementById('best_time_to_call').value,
      email: document.getElementById('email').value,
      contactNumber: document.getElementById('contact_number').value,
      homeType: document.getElementById('home_type').value,
      householdDescription: document.getElementById('household_description').value,
      rentRules: document.getElementById('rent_rules').value,
      allergy: document.querySelector('input[name="allergy"]:checked').value,
      agreement: document.querySelector('input[name="agreement"]:checked').value,
      timeForPet: document.querySelector('input[name="time_for_pet"]:checked').value,
      petId: data.id,
      petName: data.petName,
      petSpecies: data.species
    };

    const jsonFormData = JSON.stringify(formData);

    try {
      const response = await fetch('http://localhost:3000/api/applicationForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonFormData,
      });


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert(`You have successfully applied for the adoption process`);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }

    document.getElementById('full-name').value = ``
    document.getElementById('identification-id').value = ``
    document.getElementById('occupation').value = ``
    document.getElementById('address').value = ``
    document.getElementById('years_resided').value = ``
    document.getElementById('best_time_to_call').value = ``
    document.getElementById('email').value = ``
    document.getElementById('contact_number').value = ``
    document.getElementById('home_type').value = ``
    document.getElementById('household_description').value = ``
    document.getElementById('rent_rules').value = ``
    document.querySelector('input[name="allergy"]:checked').value = ``
    document.querySelector('input[name="agreement"]:checked').value = ``
    document.querySelector('input[name="time_for_pet"]:checked').value = ``


  });
}

// Function to fetch data according to the id of pets
async function fetchData(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/singlePet/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    [data] = await response.json();

    console.log(data);

  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
  
}

// Function to get id of pets from localstorage
function idOfPets() {
  id3 = localStorage.getItem('Pet Id');
}