import { render } from '@testing-library/react';
import AdminDashboard from '../pages/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

test('Renders the AdminDashboard component', () => {

  localStorage.setItem('role', 'Admin');

  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
});
