const app = require('../../../server/app.js');
const request = require('supertest');

//Here we try to get a specific patients information so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /doctorViewingPatientData', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/doctorViewingPatientData', { params: {id: 1}});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we try to get a specific patients previous symptom form information so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /doctorViewingPreviousSymptoms', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/doctorViewingPreviousSymptoms', { params: {id: 1}});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we send data to make sure that we can post to create a new row in the Viewed table of the database.
//If it does, the test will succeed and a status code of 200 will be returned to make sure the test pass.
describe('testing /markViewed', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
    let res = await request(app).post('/markViewed').send({ PatientID: 1, DoctorID: 6, datetime: '2022-04-03 00:00:00'});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we send data to make sure that we can post to update the SymptomRequested attribute in the patient table of the database.
//If it does, the test will succeed and a status code of 200 will be returned to make sure the test pass.
describe('testing /requestForm', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
    let res = await request(app).post('/requestForm').send({ PatientID: 1});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we send data to make sure that we can post to create a new row in the Viewed table of the database.
//If it does, the test will succeed and a status code of 200 will be returned to make sure the test pass.
describe('testing /flagPatient', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
    let res = await request(app).post('/flagPatient').send({ PatientID: 1});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we try to get a list of viewed patients so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /Viewed', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/Viewed');
    expect(res.statusCode).toEqual(200);
  })
});

//Here we try to get the name and status from all patients in the DB so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /DoctorPatientProfile', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/DoctorPatientProfile');
    expect(res.statusCode).toEqual(200);
  })
});