document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData();
  const imageFile = document.getElementById('image').files[0];
  formData.append('image', imageFile);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.error('Error uploading image:', error);
  }
});


async function getImages() {

  const setImage = document.querySelector('#myImage');

  const response = await fetch('http://localhost:3000/api/images/1');

  const myImg = await response.blob();
  const url = URL.createObjectURL(myImg);
  console.log(url);
  setImage.src =  URL.createObjectURL(myImg)

}
getImages();