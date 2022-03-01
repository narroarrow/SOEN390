import { render } from '@testing-library/react';
import DoctorPatientProfile from '../pages/DoctorPatientProfile';

//This tests will pass if the DoctorPatientProfile page renders correctly
test('Renders the DoctorPatientProfile page', () => {
  render(<DoctorPatientProfile />);
});
