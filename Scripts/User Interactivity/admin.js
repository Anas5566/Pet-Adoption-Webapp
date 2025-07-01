
// ------------- Side Bar Section ----------------------//

let navigationId = localStorage.getItem('Navigation Id') || 0;


const navigation = Array.from(document.querySelectorAll('.navigation'));
const dots = Array.from(document.querySelectorAll('.dots'));
const sections = Array.from(document.querySelectorAll('.sections'));

changeColorAndDisplayDot();

changeMainSection();

function changeColorAndDisplayDot() {

  navigation.forEach((element, index) => {


    // Ensures that color and dot visibility when page the loads
    if (element === navigation[navigationId]) {
      element.style.color = 'White';
      element.children[1].style.display = 'block';
    }


    element.addEventListener('click', () => {

      localStorage.setItem("Navigation Id", index)

      // Changes color of clicked element
      navigation.forEach(text => text.style.color = '#777');
      element.style.color = 'White';

      // Makes dot visible for the clicked line
      dots.forEach(line => line.style.display = 'none');
      const dot = element.children[1];
      dot.style.display = 'block';

    });
  });
}


// Function to change the main content area based on selected sidebar options
function changeMainSection() {

  sections.forEach((section) => {
    section.style.display = 'none';
  });

  sections[navigationId].style.display = 'block';  // Ensures the visibility of first page by default

  navigation.forEach((option) => {

    option.addEventListener('click', () => {

      sections.forEach((section) => {
        section.style.display = 'none';
      });

      const sectionname = option.getAttribute('id');

      const toChangeSection = document.querySelector(`.${sectionname}`);
      toChangeSection.style.display = 'block';
    });
  });
}


// ------------------- Pet Management Section (Part 1) ------------------------//

const showButton = Array.from(document.querySelectorAll('.show-button'));
const pages = Array.from(document.querySelectorAll('.pages'));
const buttonBorder = Array.from(document.querySelectorAll('.show-button'));

// populateList(petData);

changePetSection();

showButtonBorder();

addNotes();



function changePetSection() {

  pages.forEach(page => {
    page.style.display = 'none';
  });

  pages[0].style.display = 'block' // Ensures the visibility of first page by default

  showButton.forEach(show => {

    show.addEventListener('click', () => {
      pages.forEach(page => {
        page.style.display = 'none';
      });

      const varId = show.getAttribute('id');
      const element = document.querySelector(`.${varId}`);
      element.style.display = 'block';
    });
  });
}




function populateList(list) {

  // Selects the parent container
  const parent = document.querySelector('.list-container');

  // Empty's the parent container
  parent.innerHTML = '';

  let j = 0;

  // console.log(list)

  for (let i = 0; i < list.length; i++) {

    // Main element
    let childContainer = document.createElement('div');
    childContainer.setAttribute('class', 'pet-title');


    // Creates child elements and append it to the parent
    let id = document.createElement('div');
    childContainer.append(id);
    id.innerText = `${list[i].id}`;

    let petName = document.createElement('div');
    childContainer.append(petName);
    petName.innerText = `${list[i].petName}`;

    let species = document.createElement('div');
    childContainer.append(species);
    species.innerText = `${list[i].species}`;

    let breed = document.createElement('div');
    childContainer.append(breed);
    breed.innerText = `${list[i].breed}`;

    let gender = document.createElement('div');
    childContainer.append(gender);
    gender.innerText = `${list[i].gender}`;

    let location = document.createElement('div');
    childContainer.append(location);
    location.innerText = `${list[i].location}`;

    let age = document.createElement('div');
    childContainer.append(age);
    age.innerText = `${list[i].age} ${list[i].period}`;

    let actions = document.createElement('div');
    childContainer.append(actions);


    if (list[i].adoptionStatus === 'Available') {

      let button1 = document.createElement('button');
      actions.append(button1);
      button1.setAttribute('class', 'button-1 delete-button');
      button1.style.border = 'none'
      let icon1 = document.createElement('i');
      button1.append(icon1);
      icon1.setAttribute('class', 'fa-solid fa-trash icon-1');
      button1.setAttribute('id', `${list[i].id}`);

      let button2 = document.createElement('button');
      actions.append(button2);
      button2.setAttribute('class', 'button-2 mark-button');
      button2.style.border = 'none'
      let icon2 = document.createElement('i');
      button2.append(icon2);
      icon2.setAttribute('class', 'fa-solid fa-check-double icon-1');
      button2.setAttribute('id', `${list[i].id}`);
    } else {
      actions.innerText = 'Adopted';
      actions.style.color = 'red';
    }

    parent.append(childContainer);


    // Creates horizontal line except on the last element

    if (j < list.length - 1) {
      let hr = document.createElement('div');
      hr.setAttribute('class', 'hr');
      parent.append(hr);
      j++;
    }

    if (i === list.length - 1) {
      getPetId();
    }
  }
}


// Function to get the pet ID on clicking view button to action on data of that pet
function getPetId() {

  // Delete the pet
  const deleteButton = document.querySelectorAll('.delete-button');

  deleteButton.forEach((button) => {

    button.addEventListener('click', async () => {
      const id1 = button.getAttribute('id');
      console.log(`clicked ${id1}`);

      // Backend 
      try {
        const response = await fetch(`http://localhost:3000/api/deletePet/${id1}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
      }
    });
  });

  // Update the pet as adopted
  const markButton = document.querySelectorAll('.mark-button');

  markButton.forEach((button) => {

    button.addEventListener('click', async () => {
      const id2 = button.getAttribute('id');
      console.log(`clicked ${id2}`);

      // Backend
      try {
        const response = await fetch(`http://localhost:3000/api/updatePet/${id2}`, {
          method: 'PUT',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
      }

    });
  });
}


// Function for page show-button to display color
function showButtonBorder() {

  buttonBorder[0].style.borderBottom = '3px solid #101e49'

  buttonBorder.forEach((element) => {
    element.addEventListener('click', () => {

      buttonBorder.forEach((button) => {
        button.style.borderBottom = '3px solid transparent'
      });

      element.style.borderBottom = '3px solid #101e49'
    });
  });
}

// Function to add notes
function addNotes() {

  const addButton = document.querySelector('.add-note');
  const textArea = document.querySelector('.notes');
  textArea.value = JSON.parse(localStorage.getItem('My Notes'));

  addButton.addEventListener('click', () => {
    const notes = textArea.value;
    localStorage.setItem('My Notes', JSON.stringify(notes));
    textArea.value = JSON.parse(localStorage.getItem('My Notes'));
  });
}



// ------------------- Pet Management Section (Part 2) ------------------------//

const photoInput = document.getElementById('photos');
const photoCount = document.getElementById('photoCount');
const photoError = document.getElementById('photoError');
const videoInput = document.getElementById('videos');
const videoCount = document.getElementById('videoCount');
const videoError = document.getElementById('videoError');

// checkPhotos();

// checkVideos();


function checkPhotos() {
  photoInput.addEventListener('change', () => {
    const files = photoInput.files;
    if (files.length > 4) {
      photoError.textContent = 'You can only upload a maximum of 4 photos';
      photoCount.textContent = `4/4 photos added`;
    } else {
      photoError.textContent = '';
      photoCount.textContent = `${files.length}/4 photos added`;
    }
  });
}

function checkVideos() {
  videoInput.addEventListener('change', () => {
    const files = videoInput.files;
    if (files.length > 1) {
      videoError.textContent = 'You can only upload a maximum of 1 video';
      videoCount.textContent = `1/1 video added`;
    } else {
      videoError.textContent = '';
      videoCount.textContent = `${files.length}/1 video added`;
    }
  });
}


// ------------------- Application Section -------------------- //

function populateApplicationList(list) {
  const applicationContainer = document.querySelector('.application-page-list');
  applicationContainer.innerHTML = ``;

  for (i = 0; i < list.length; i++) {

    const anchor = document.createElement('a');
    anchor.setAttribute('href', '../HTML/application_detail.html');
    anchor.setAttribute('id', `${list[i].id}`);
    anchor.setAttribute('class', `give-id`);

    const container = document.createElement('div');
    anchor.append(container);
    container.setAttribute('class', 'list-content');

    const container2 = document.createElement('div');
    container.append(container2);
    container2.setAttribute('class', 'application-details');

    // Child 1
    const child1 = document.createElement('div');
    container2.append(child1);
    child1.setAttribute('class', 'applicant');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    child1.append(span1);
    child1.append(span2);
    span1.innerText = `Name: `;
    span2.innerText = `${list[i].fullName}`;

    // Child 2
    const child2 = document.createElement('div');
    container2.append(child2);
    child1.setAttribute('class', 'appld-pet');
    const span3 = document.createElement('span');
    const span4 = document.createElement('span');
    child2.append(span3);
    child2.append(span4);
    span3.innerText = `Applied For:`;
    span4.innerText = `${list[i].petName}`;

    // Child 3
    const child3 = document.createElement('div');
    container2.append(child3);
    child1.setAttribute('class', 'date');
    const span5 = document.createElement('span');
    const span6 = document.createElement('span');
    child3.append(span5);
    child3.append(span6);
    span5.innerText = `Date:`;

    // Converts date
    const dateFromDatabase = new Date(list[i].appliedAt);
    const formattedDate = dateFromDatabase.toLocaleDateString('en-US');
    span6.innerText = `${formattedDate}`;


    // Child 4
    const child4 = document.createElement('div');
    container2.append(child4);
    child1.setAttribute('class', 'status');
    const span7 = document.createElement('span');
    const span8 = document.createElement('span');
    child4.append(span7);
    child4.append(span8);
    span7.innerText = `Status: `;
    span8.innerText = `${list[i].status}`;
    if (list[i].status === `Approved`) {
      span8.setAttribute('class', 'status-approved');
    } else if (list[i].status === `Pending`) {
      span8.setAttribute('class', 'status-pending');
    } else {
      span8.setAttribute('class', 'status-rejected');
    }

    // Append to main container
    applicationContainer.append(anchor);

    if (i === list.length - 1) {
      getIdOfPets();
    }
  }
}

// Filter applications
function filterApplication(list) {

  const filter = document.querySelector('#filter-dropdown');

  filter.addEventListener('change', () => {
    console.log('Changed');
    const value = filter.value;

    if (value === 'Pending') {
      const pendingLit = list.filter(item => item.status === 'Pending');
      populateApplicationList(pendingLit);
    } else if (value === 'Approved') {
      const approvedList = list.filter(item => item.status === 'Approved');
      populateApplicationList(approvedList);
    } else if (value === 'Rejected') {
      const rejectedList = list.filter(item => item.status === 'Rejected');
      populateApplicationList(rejectedList);
    } else {
      populateApplicationList(list);
    }
  });
}


// Get ids of application
async function getIdOfPets() {

  const appButton = document.querySelectorAll('.give-id');

  appButton.forEach((button) => {
    button.addEventListener('click', () => {
      const appId = button.getAttribute('id');
      localStorage.setItem('Application Id', appId);
    });
  });
}