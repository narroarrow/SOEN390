import { render } from '@testing-library/react';
import EditInfoForm from '../pages/EditInfoForm.js';
import { BrowserRouter } from 'react-router-dom';


test('Renders the EditInfoForm component', () => {
  localStorage.setItem('role', 'Patient');

  render(
    <BrowserRouter>
      <EditInfoForm />
    </BrowserRouter>
  );
});
