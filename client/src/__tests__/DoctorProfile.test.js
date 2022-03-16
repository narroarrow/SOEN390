import { render } from '@testing-library/react';
import DoctorDashboard from '../pages/DoctorDashboard';
import { BrowserRouter } from 'react-router-dom';

test('Renders the DoctorDashboard component', () => {

  localStorage.setItem('role', 'Doctor');

  render(
    <BrowserRouter>
      <DoctorDashboard />
    </BrowserRouter>);
});
