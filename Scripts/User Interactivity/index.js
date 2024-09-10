
let item;
let imgContainer;
let nameContainer;
let breedContainer;
let buttonContainer;
let img;
let span1;
let span2;
let span3;
let span4;
let button;
let featuredPets;


async function fetchFeaturedItems() {
  try {
    const response = await fetch('http://localhost:3000/api/featuredPets');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    featuredPets = await response.json();
    displayHomeItems();
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error);
  }
}



function displayHomeItems() {

  let itemsContainer = document.querySelector('.section-2'); //Selects parent container
  itemsContainer.innerHTML = ""; //Empty the parent container

  for (let i = 0; i < featuredPets.length; i++) {

    // Creates all the container elements and set their attribute
    item = document.createElement('div');
    item.setAttribute('class', 'items');

    imgContainer = document.createElement('div');
    item.append(imgContainer);
    imgContainer.setAttribute('class', 'container');

    nameContainer = document.createElement('div');
    item.append(nameContainer);
    nameContainer.setAttribute('class', 'name');

    breedContainer = document.createElement('div');
    item.append(breedContainer);
    breedContainer.setAttribute('class', 'breed');

    buttonContainer = document.createElement('div');
    item.append(buttonContainer);
    buttonContainer.setAttribute('class', 'apply');


    // Append image to its container
    img = document.createElement('img');
    img.setAttribute('src', `${featuredPets[i].imagePath}`);
    imgContainer.append(img);

    // Append name and species
    span1 = document.createElement('span');
    nameContainer.append(span1);
    span1.innerText = `${featuredPets[i].petName}`;

    span2 = document.createElement('span');
    nameContainer.append(span2);
    span2.innerText = `${featuredPets[i].species}`;

    // Append breed and age
    span3 = document.createElement('span');
    breedContainer.append(span3);
    span3.innerText = `Breed: ${featuredPets[i].breed}`;

    span4 = document.createElement('span');
    breedContainer.append(span4);
    span4.innerText = `Age: ${featuredPets[i].age}`;

    // Append button
    const anchor = document.createElement('a');
    buttonContainer.append(anchor);
    anchor.setAttribute('href', '../HTML/clientpetdetails.html');

    button = document.createElement('button');
    anchor.append(button);
    button.setAttribute('id', `${featuredPets[i].id}`);
    button.setAttribute('class', 'getId');
    button.innerText = `DETAILS`;

    itemsContainer.append(item);

    if (i === featuredPets.length - 1) {
      getIdOfPets();
    }

  }
}


// Function to display blogs on the home page
function displayBlogs() {

  //Selecs the parent container
  const blogContainer = document.querySelector('.blog-section');

  blogContainer.innerHTML = ''; //Empty the parent container

  for (let i = 0; i < homePageBlogs.length; i++) {

    //Creates the parent element  
    let blogParent = document.createElement('div');

    //Every blog has differnt size. Class is given on that base.
    blogParent.setAttribute('class', `blog-${i + 1}`);

    // Creates the child elements and append it to the parent
    let blogImg = document.createElement('img');
    blogParent.append(blogImg);
    blogImg.setAttribute('src', `${homePageBlogs[i].image}`);

    let blogSpan = document.createElement('span');
    blogParent.append(blogSpan);
    blogSpan.innerText = `${homePageBlogs[i].title}`;

    let blogPara = document.createElement('p');
    blogParent.append(blogPara);
    blogPara.innerText = displayBlogContent(i);

    let blogA = document.createElement('a');
    blogParent.append(blogA);
    blogA.innerText = 'Read More';
    

    blogContainer.append(blogParent);

  }

}

// 
function displayBlogContent(index) {
  let blogContent = homePageBlogs[index].content;
  let array2 = blogContent.split(' ');
  let array3 = array2.splice(0, 12);
  array3.push('...');
  let final = array3.join(' ');
  return final;
}



async function getIdOfPets() {

  const petButtons = document.querySelectorAll('.getId');

  console.log(petButtons);
  
  petButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const petId = button.getAttribute('id');
    localStorage.setItem('Pet Id', petId);
  });
});
}

displayBlogs();

fetchFeaturedItems();
