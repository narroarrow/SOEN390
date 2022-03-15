import { render } from '@testing-library/react';
import SymptomForm from '../pages/SymptomForm.js';
import { BrowserRouter } from 'react-router-dom';


test('Renders the SymptomForm component', () => {
  localStorage.setItem('role', 'Patient');

  render(
  <BrowserRouter>
  <SymptomForm />
  </BrowserRouter>);
});
