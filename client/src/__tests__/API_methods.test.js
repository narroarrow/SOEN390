const app = require('../../../server/app.js');
const request = require('supertest');
const { changeUser } = require('../../../server/database.js');

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

//Here we send data to make sure that we can post to create a Symtpom form.
//If it does so, the test will succeed and a status code of 200 will be returned
//to make the test pass. This will fail after it passes, to make it pass again, 
//change the timestamp value by 1.
describe('testing /createSymptomForm', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).post('/createSymptomForm').send({ timestamp: 1645465574884, weight: 25, temperature: 66, breathing: 1, chest: 2, fatigue: 1, fever: 1, cough: 5, smell: 4, taste: 2, symptoms: 'sore' })
        expect(res.statusCode).toEqual(200);
    })
});

//Here we send data to make sure that we can post to alter the patient's status.
//If it does so, the test will succeed and a status code of 200 will be returned
//to make the test pass.
describe('testing /createPatientCovidStatus', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).post('/createPatientCovidStatus').send({ status: 2 });
        expect(res.statusCode).toEqual(200);
    })
});

//Here we send data to make sure that we can post to edit patient data.
//If it does so, the test will succeed and a status code of 200 will be returned
//to make the test pass.
describe('testing /editedPatientData', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).post('/editedPatientData').send({ fname: 'Maxime', lname: 'Giroux', email: 'giroux2000@gmail.com', phone: '514 514 5145', healthinsurance: 'test'});
        expect(res.statusCode).toEqual(200);
    })
});

//Here we just try to get the patient profile data.
//If the get is successful, a 200 status code will be returned
//to make the test pass.
describe('testing /patientProfileData', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).get('/patientProfileData');
        expect(res.statusCode).toEqual(200);
    })
});

//Here we just try to get the patient profile data so that it can be edited.
//If the get is successful, a 200 status code will be returned
//to make the test pass.
describe('testing /editPatientProfileData', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).get('/editPatientProfileData');
        expect(res.statusCode).toEqual(200);
    })
});


describe('testing /Login', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
      let res = await request(app).post('/Login').send({email:'e.han@hotmail.com',password: '@Root1234'});
      expect(res.status).toEqual(200);
  })
});


describe('testing /Signup', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
      let res = await request(app).post('/Signup').send({firstName: 'Matt', lastName:'Pop', email:'e.han@hotmail.com',password: '@Root1234', userRole:'Doctor',phoneNumber:'5146683216'});
      expect(res.status).toEqual(200);
  })
});

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