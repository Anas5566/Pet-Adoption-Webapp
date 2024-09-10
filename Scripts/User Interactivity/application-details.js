
let appId = localStorage.getItem('Application Id');



function updateAdopterInfo(details) {
  document.getElementById('full_name').textContent = details.fullName;
  document.getElementById('identification_id').textContent = details.identificationId;
  document.getElementById('occupation').textContent = details.occupation;
  document.getElementById('address').textContent = details.address;
  document.getElementById('years_resided').textContent = details.yearsResided;
  document.getElementById('best_time_to_call').textContent = details.bestTimeToCall;
  document.getElementById('email').textContent = details.email;
  document.getElementById('contact_number').textContent = details.contactNumber;
  document.getElementById('home_type').textContent = details.homeType;
  document.getElementById('household_description').textContent = details.householdDescription;
  document.getElementById('rent_rules').textContent = details.rentRules;
  document.getElementById('allergy').textContent = details.allergy;
  document.getElementById('agreement').textContent = details.agreement;
  document.getElementById('time_for_pet').textContent = details.timeForPet;
  document.getElementById('application-id').textContent = `A${details.id}`;
  document.getElementById('applied-pet-id').textContent = details.petId;
  document.getElementById('applied-pet-name').textContent = details.petName;
  document.getElementById('applied-pet-species').textContent = details.petSpecies;
  document.getElementById('application-status').textContent = details.status;

  // Convert date
  const dateFromDatabase = new Date(details.appliedAt);
  const formattedDate = dateFromDatabase.toLocaleDateString('en-US');
  document.getElementById('applied-pet-species').textContent = formattedDate;
}

async function fetchDetails() {

  try {
    const response = await fetch(`http://localhost:3000/api/applicationDetails/${appId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const [applicationDetails] = await response.json();
    updateAdopterInfo(applicationDetails);


  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}

// Function to approve application
async function approveApp() {

  document.querySelector('#approve').addEventListener('click', async () => {

    try {
      const response = await fetch(`http://localhost:3000/api/updateAppStatusApp/${appId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      alert('Application has been successfilly approved.');

    } catch (error) {
      console.error('There has been a problem with your approve operation: ', error);
    }
  });
}

// Function to reject application
async function rejectApp() {

  document.querySelector('#reject').addEventListener('click', async () => {

    try {
      const response = await fetch(`http://localhost:3000/api/updateAppStatusRej/${appId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      alert('Application has been rejected.');

    } catch (error) {
      console.error('There has been a problem with your approve operation: ', error);
    }
  });
}

// Get id of navigation
async function getIdOfNavigation() {

  const navigationButtons = document.querySelectorAll('.navigation');

  console.log(navigationButtons);
  navigationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const navigationId = button.getAttribute('id');
      localStorage.setItem('Navigation Id', navigationId);
    });
  });
}

fetchDetails();

approveApp();

rejectApp();

getIdOfNavigation()