import { render } from '@testing-library/react';
import PatientAppointment from '../pages/PatientAppointment';

//This tests will pass if the PatientAppointment page renders correctly
test('Renders the PatientAppointment page', () => {
  render(<PatientAppointment />);
});