import { render } from '@testing-library/react';
import DoctorViewingPatient from '../pages/DoctorViewingPatient';

//This tests will pass if the DoctorViewingPatient page renders correctly
test('Renders the DoctorViewingPatient page', () => {
  render(<DoctorViewingPatient />);
});
