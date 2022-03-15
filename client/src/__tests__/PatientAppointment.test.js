import { render } from '@testing-library/react';
import PatientAppointment from '../pages/PatientAppointment';
import { BrowserRouter } from 'react-router-dom';


//This tests will pass if the PatientAppointment page renders correctly
test('Renders the PatientAppointment page', () => {

  localStorage.setItem('role', 'Patient');

  render(
  <BrowserRouter>
  <PatientAppointment />
  </BrowserRouter>);
});