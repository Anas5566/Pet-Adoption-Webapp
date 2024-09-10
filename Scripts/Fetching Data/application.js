


async function fetchApplications() {
  try{
    const response = await fetch('http://localhost:3000/api/applications');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const allApplications = await response.json();
  

    populateApplicationList(allApplications);

    filterApplication(allApplications);


  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}

fetchApplications();

