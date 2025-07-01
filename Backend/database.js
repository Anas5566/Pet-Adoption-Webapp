const mysql = require('mysql2');


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3350,
  password: "Anas@123",
  database: "petadoption",
}).promise();


// ---------- User side queries --------- //

// Get home page featured pets
async function getFeaturedPets() {
  try {
    const query = `SELECT * FROM Pets WHERE featuredPets = 'Yes'`;
    const [result] = await pool.query(query);
    return result;
  } catch (error) {
    console.error('Error fetching featured pets:', error);
    throw error; // rethrow the error so the caller can handle it
  }
}

// Get pet list section items
async function getPets() {
  const query = `SELECT * FROM Pets`;
  const [result] = await pool.query(query);
  return result;
}

// Insert contact form data
async function contactForm(name, email, subject, message) {
  const query = `INSERT INTO contact_form (name, email, subject, message) VALUES (?, ? ,?, ?)`;
  pool.query(query, [name, email, subject, message]);
}

// Get single pet details
async function getSinglePet(id) {
  const query = `SELECT * FROM Pets WHERE id = ?`;
  const [result] = await pool.query(query, [id]);
  return result;
}

// Insert application form
async function applicationForm(data) {
  const {
    fullName, identificationId, occupation, address, yearsResided,
    bestTimeToCall, email, contactNumber, homeType, householdDescription,
    rentRules, allergy, agreement, timeForPet, petId, petName, petSpecies
  } = data;

  const sql = `
    INSERT INTO applicationForm (
      fullName, identificationId, occupation, address, yearsResided,
      bestTimeToCall, email, contactNumber, homeType, householdDescription,
      rentRules, allergy, agreement, timeForPet,petId, petName, petSpecies
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fullName, identificationId, occupation, address, yearsResided,
    bestTimeToCall, email, contactNumber, homeType, householdDescription,
    rentRules, allergy, agreement, timeForPet, petId, petName, petSpecies
  ];

  await pool.query(sql, values);
}

// ----------- Admin side queries ---------- //


async function getNoOfPets() {
  const query = `SELECT COUNT(*) AS count FROM Pets WHERE adoptionStatus = 'Available';`;
  const [result] = await pool.query(query);
  return result;
}

async function getNoOfAdoptions() {
  const query = `SELECT COUNT(*) AS count FROM Pets WHERE adoptionStatus = 'Adopted';`;
  const [result] = await pool.query(query);
  return result;
}

async function getNoOfApplications() {
  const query = `SELECT COUNT(*) AS count FROM applicationform;`;
  const [result] = await pool.query(query);
  return result;
}

async function getNoOfPendingApplications() {
  const query = `SELECT COUNT(*) AS count FROM applicationform WHERE status = 'Pending';`;
  const [result] = await pool.query(query);
  return result;
}

async function getNoOfApprovedApplications() {
  const query = `SELECT COUNT(*) AS count FROM applicationform WHERE status = 'Approved';`;
  const [result] = await pool.query(query);
  return result;
}

async function getNoOfRejectedApplications() {
  const query = `SELECT COUNT(*) AS count FROM applicationform WHERE status = 'Rejected';`;
  const [result] = await pool.query(query);
  return result;
}

async function getAdminPetList() {
  const query = `SELECT * FROM Pets`;
  const [result] = await pool.query(query);
  return result;
}

async function newPet(petName, species, breed, age, period, size, gender, location, description, adoptionStatus, specialNeeds) {
  const query = `
  INSERT INTO Pets (petName, species, breed, age, period, size, gender, location, description, adoptionStatus) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  pool.query(query, [petName, species, breed, age, period, size, gender, location, description, adoptionStatus, specialNeeds]);
}

async function deleteAPet(id) {
  const query = 'DELETE FROM Pets WHERE id = ?';
  pool.query(query, [id]);
}

async function updateAPet(id) {
  const query = 'UPDATE Pets SET adoptionStatus = ? WHERE id = ?';
  await pool.query(query, ['Adopted', id]);
}

async function getApplications() {
  const query = `SELECT * FROM applicationform`;
  const [data] = await pool.query(query);
  return data;
}

async function getApplicationDetails(id) {
  const query = `SELECT * FROM applicationform WHERE id = ?`;
  const [data] = await pool.query(query, [id]);
  return data;
}

async function updateApplicationApp(id) {
  const query = 'UPDATE applicationform SET status = ? WHERE id = ?';
  await pool.query(query, ['Approved', id]);
}

async function updateApplicationRej(id) {
  const query = 'UPDATE applicationform SET status = ? WHERE id = ?';
  await pool.query(query, ['Rejected', id]);
}

async function uploadImages(name, path) {
  const query = `INSERT INTO images (name, path) VALUES (?, ?)`;
  await pool.query(query, [name, path]);
}


module.exports = {getPets, getFeaturedPets, contactForm, getNoOfPets, getNoOfAdoptions,
  getNoOfApplications, getNoOfPendingApplications, getNoOfApprovedApplications, getNoOfRejectedApplications,
  getAdminPetList, newPet, getSinglePet, applicationForm,
  deleteAPet, updateAPet, getApplications, getApplicationDetails,
  updateApplicationApp, updateApplicationRej, uploadImages}