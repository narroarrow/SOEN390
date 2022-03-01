const app = require('../../../server/app.js');
const request = require('supertest');

//Here we try to get basic contact information for all validated doctors.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /adminViewingValidatedDoctorData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/adminViewingValidatedDoctorData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get basic contact information for all unvalidated doctors.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /adminViewingUnvalidatedDoctorData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/adminViewingUnvalidatedDoctorData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get basic contact information for all patients.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /adminViewingPatientData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/adminViewingPatientData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all patients.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingTheirPatientData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingTheirPatientData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all doctors.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingAllDoctors', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingAllDoctors');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all patients organized by doctor.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingDoctorPatients', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingDoctorPatients');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all patients.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingAllPatientData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingAllPatientData');
      expect(res.statusCode).toEqual(200);
    })
  });

  //Here we try to validate a doctor
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /validateDoctor', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).post('/validateDoctor').send({DoctorID: 6});
    expect(res.statusCode).toEqual(200);
  })
});