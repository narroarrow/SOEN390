import { render } from '@testing-library/react';
import DoctorPatientProfile from '../pages/DoctorPatientProfile';
import { BrowserRouter } from 'react-router-dom';

//This tests will pass if the DoctorPatientProfile page renders correctly
test('Renders the DoctorPatientProfile page', () => {

  localStorage.setItem('role', 'Doctor');

  render(
    <BrowserRouter>
      <DoctorPatientProfile />
    </BrowserRouter>);
});
