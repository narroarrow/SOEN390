import { render } from '@testing-library/react';
import DoctorPatientProfile from '../pages/DoctorPatientProfile';

const app = require('../../../server/app.js');
const request = require('supertest');

//This tests will pass if the DoctorPatientProfile page renders correctly
test('Renders the DoctorPatientProfile page', () => {
  render(<DoctorPatientProfile />);
});

//Here we try to get the name and status from all patients in the DB so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /DoctorPatientProfile', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/DoctorPatientProfile');
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
