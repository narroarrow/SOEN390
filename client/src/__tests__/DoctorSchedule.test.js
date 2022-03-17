import { render } from '@testing-library/react';
import DoctorSchedule from '../pages/DoctorSchedule';
import { BrowserRouter } from 'react-router-dom';

test('Renders the Doctor Schedule component', () => {
  localStorage.setItem('role', 'Doctor');
  render(
  <BrowserRouter>
      <DoctorSchedule />
    </BrowserRouter>);
  
});
