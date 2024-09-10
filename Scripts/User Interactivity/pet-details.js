
let id2;

idOfPets();

fetchData(id2);

carousel();


// Function to fetch data according to the id of pets
async function fetchData(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/singlePet/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const [data] = await response.json();

    // console.log(data);

    // Display details based on fetched data
    populateDetails(data);

  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
  
}

// Function of carousel
function carousel() {


  let currentIndex = 0;

  function showImage(index) {
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

    if (index >= totalImages) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalImages - 1;
    } else {
      currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
  }

  function nextImage() {
    showImage(currentIndex + 1);
  }

  function prevImage() {
    showImage(currentIndex - 1);
  }

  // Initialize the carousel to show the first image
  showImage(currentIndex);


  document.querySelector('.left').addEventListener('click', prevImage);
  document.querySelector('.right').addEventListener('click', nextImage);
}

// Function to populate details
async function populateDetails(data) {

  // Details Section
  document.querySelector('.name').innerText = `${data.petName}`;
  document.querySelector('.species').innerText = `(${data.species})`;
  document.querySelector('.breed').innerText = `${data.breed}`;
  document.querySelector('.age').innerText = `${data.age} ${data.period}`;
  document.querySelector('.gender').innerText = `${data.gender}`;
  document.querySelector('.location').innerText = `${data.location}`;
  document.querySelector('.special-need').innerText = `${data.specialNeeds}`;
  document.querySelector('.description').innerText = `${data.description}`;

  // Carouselm Images
  document.querySelector('#image1').setAttribute('src', `${data.imagePath}`);
  document.querySelector('#image2').setAttribute('src', `${data.imagePath}`);
  document.querySelector('#image3').setAttribute('src', `${data.imagePath}`);
  document.querySelector('#image4').setAttribute('src', `${data.imagePath}`);
}

// Function to get id of pets from localstorage
function idOfPets() {
  id2 = localStorage.getItem('Pet Id');
}

