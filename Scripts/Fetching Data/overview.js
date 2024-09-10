
// ---------------- Overview Section --------------------- //

fetchNoOfPets();

fetchNoOfAdoptions();

fetchNoOfApplications();

fetchPendingApplications();

fetchApprovedApplications();

fetchRejectedApplications();

// Get no. of pets
async function fetchNoOfPets() {

  try {
    const response = await fetch('http://localhost:3000/api/noOfPets');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const numberOfPets = await response.json();
    const actualNumber = numberOfPets[0].count;
    document.querySelector('.pets-no').innerText = actualNumber;

  }
  catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}


// Get no. of adoptions
async function fetchNoOfAdoptions() {

  try {
    const response = await fetch('http://localhost:3000/api/noOfAdoptions');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const numberOfAdoptions = await response.json();
    const actualNumber = numberOfAdoptions[0].count;
    document.querySelector('.adoption-no').innerText = actualNumber;

  }
  catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}

// Get no. of applications
async function fetchNoOfApplications() {

  try {
    const response = await fetch('http://localhost:3000/api/noOfApplications');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const numberOfApplications = await response.json();
    const actualNumber = numberOfApplications[0].count;
    document.querySelector('.total-applications').innerText = actualNumber;

  }
  catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}

// Get pending applications
async function fetchPendingApplications() {

  try {
    const response = await fetch('http://localhost:3000/api/noOfPendingApplications');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const numberOfPendingAdoptions = await response.json();
    const actualNumber = numberOfPendingAdoptions[0].count;
    document.querySelector('.pending-applications').innerText = actualNumber;

  }
  catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}

// Get approved applications
async function fetchApprovedApplications() {

  try {
    const response = await fetch('http://localhost:3000/api/noOfApprovedApplications');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const numberOfApprovedAdoptions = await response.json();
    const actualNumber = numberOfApprovedAdoptions[0].count;
    document.querySelector('.approved-applications').innerText = actualNumber;

  }
  catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}

// Get rejected applications
async function fetchRejectedApplications() {

  try {
    const response = await fetch('http://localhost:3000/api/noOfRejectedApplications');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const numberOfRejectedAdoptions = await response.json();
    const actualNumber = numberOfRejectedAdoptions[0].count;
    document.querySelector('.rejected-applications').innerText = actualNumber;

  }
  catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}