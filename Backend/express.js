const express = require('express');
const db = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer
const storage = multer.diskStorage({
  destination: '../uploads/',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage: storage,
});


app.post('/api/image',upload.single('image'), async (req, res) =>{
  const {myImage} = req.file;
  const {name} = req.body.name;

  try {
    await db.uploadImages(name, myImage);
    res.send('success');
  } catch (error) {
    console.error(error);
    res.send('Failed' + error);
  }
});




// -------- Get Requests --------- //

// Get home page featured pets
app.get('/api/featuredPets', async (req, res) => {
  const featuredItems = await db.getFeaturesPets();
  res.json(featuredItems);
});

// Get pet list section items
app.get('/api/pets', async (req, res) => {
  const items = await db.getPets();
  res.json(items);
});

// Get no. of pets 
app.get('/api/noOfPets', async (req, res) => {
  const number = await db.getNoOfPets();
  res.json(number);
});

// Get no. of adoptions 
app.get('/api/noOfAdoptions', async (req, res) => {
  const number = await db.getNoOfAdoptions();
  res.json(number);
});

// Get total no. of application 
app.get('/api/noOfApplications', async (req, res) => {
  const number = await db.getNoOfApplications();
  res.json(number);
});

// Get no. of pending applications
app.get('/api/noOfPendingApplications', async (req, res) => {
  const number = await db.getNoOfPendingApplications();
  res.json(number);
});

// Get no. of approved applications
app.get('/api/noOfApprovedApplications', async (req, res) => {
  const number = await db.getNoOfApprovedApplications();
  res.json(number);
});

// Get no. of approved applications
app.get('/api/noOfRejectedApplications', async (req, res) => {
  const number = await db.getNoOfRejectedApplications();
  res.json(number);
});

// Get admin pet list
app.get('/api/adminPetList', async (req, res) => {
  const adminPetList = await db.getAdminPetList();
  res.json(adminPetList);
});

// Get single pet
app.get('/api/singlePet/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db.getSinglePet(id);
  res.json(result);
});

// Get all applications
app.get('/api/applications', async (req, res) => {
  const result = await db.getApplications();
  res.json(result);
});

app.get('/api/applicationDetails/:id', async (req, res) => {
  const { id } = req.params;
  const result = await db.getApplicationDetails(id);
  res.json(result);
});


// ------- Post Requests ------- // 


// Insert contact form data
app.post('/api/contactForm', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await db.contactForm(name, email, subject, message);
    res.send('Form data uploaded successfullly');
  }
  catch {
    res.status(500).send('Error uploading form data');
  }
});


// Insert application form data
app.post('/api/applicationForm', async (req, res) => {
  const {
    fullName, identificationId, occupation, address, yearsResided,
    bestTimeToCall, email, contactNumber, homeType, householdDescription,
    rentRules, allergy, agreement, timeForPet, petId, petName, petSpecies
  } = req.body;

  try {
    await db.applicationForm({
      fullName, identificationId, occupation, address, yearsResided,
      bestTimeToCall, email, contactNumber, homeType, householdDescription,
      rentRules, allergy, agreement, timeForPet, petId, petName, petSpecies
    });
    res.send('Application form data uploaded successfully');
  } catch (error) {
    console.error('Error uploading application form data:', error);
    res.status(500).send('Error uploading application form data');
  }
});

// Add new pet
app.post('/api/addNewPet', async (req, res) => {
  const { petName, species, breed, age, period, size, gender, location, description, adoptionStatus, specialNeeds } = req.body;

  try {
    await db.newPet(petName, species, breed, age, period, size, gender, location, description, adoptionStatus, specialNeeds);
    res.send('Form data uploaded successfullly');
  }
  catch {
    res.status(500).send('Error uploading form data');
  }
});

// Delete pets
app.delete('/api/deletePet/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = db.deleteAPet(id);
    res.send('Pet deleted successfully');
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).send('Error deleting pet');
  }
});

// Mark pet a adopted
app.put('/api/updatePet/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = db.updateAPet(id);
    res.send('Pet updated successfully');
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).send('Error updating pet');
  }
});


// Update application status to approved
app.put('/api/updateAppStatusApp/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.updateApplicationApp(id);
  } catch (error) {
    res.send('Error in api' + error);
  }
});

// Update application status to reject
app.put('/api/updateAppStatusRej/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.updateApplicationRej(id);
  } catch (error) {
    res.send('Error in api' + error);
  }
});





























app.listen(port, () => {
  console.log(`Server is runnning at http://localhost:${port}`);
});