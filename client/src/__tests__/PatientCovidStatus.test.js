import { render } from '@testing-library/react';
import PatientCovidStatus from '../pages/PatientCovidStatus.js';
import { BrowerRouter, BrowserRouter } from 'react-router-dom'


test('Renders the PatientCovidStatus component', () => {

  localStorage.setItem('role', 'Patient');

  render(
  <BrowserRouter>
  <PatientCovidStatus />
  </BrowserRouter>
  );
});
