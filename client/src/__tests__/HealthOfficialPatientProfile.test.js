import { render } from '@testing-library/react';
import HealthOfficialPatientProfile from '../pages/HealthOfficialPatientProfile';
import { BrowserRouter } from 'react-router-dom';

test('Renders the HealthOfficialPatientProfile page', () => {

  localStorage.setItem('role', 'HealthOfficial');

    render(
    <BrowserRouter>
    <HealthOfficialPatientProfile />
    </BrowserRouter>);
  });