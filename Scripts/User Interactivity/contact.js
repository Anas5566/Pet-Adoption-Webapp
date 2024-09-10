

const inputs = Array.from(document.querySelectorAll('.input'));
const labels = Array.from(document.querySelectorAll('label'));

fontColorAndSize();



function fontColorAndSize() {

  inputs.forEach((input) => {

    input.addEventListener('click', () => {

      labels.forEach((label) => {
        label.style.fontWeight = '400';
        label.style.color = '#777';
      });

      const inputId = input.getAttribute('id');

      const toChangeLabel = document.querySelector(`.${inputId}`);
      toChangeLabel.style.fontWeight = '410';
      toChangeLabel.style.color = '#008686';
    });
  });
}

// Function to store form, data into mysql database
function insertFormData() {

  document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const subjectValue = document.getElementById('subject').value;
    const messageValue = document.getElementById('message').value;

    const formData = {
      name: nameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue
    };

    const jsonFormData = JSON.stringify(formData);

    try {
      const response = await fetch('http://localhost:3000/api/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonFormData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert(`Thanks for reaching us ${nameValue}. We will reach you soon.`);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
  });



}

insertFormData();