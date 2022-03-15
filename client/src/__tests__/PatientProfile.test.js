import { render } from '@testing-library/react';
import PatientProfile from '../pages/PatientProfile.js';
import { BrowserRouter } from 'react-router-dom';

test('Renders the PatientProfile component', () => {

  localStorage.setItem('role', 'Patient');

  render(
  <BrowserRouter>
  <PatientProfile />
  </BrowserRouter>);
});
