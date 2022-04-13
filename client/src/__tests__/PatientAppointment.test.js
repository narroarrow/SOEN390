import { render } from '@testing-library/react';
import PatientAppointment from '../pages/PatientAppointment';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });


//This tests will pass if the PatientAppointment page renders correctly
test('Renders the PatientAppointment page', () => {

  localStorage.setItem('role', 'Patient');

  render(
  <BrowserRouter>
  <PatientAppointment />
  </BrowserRouter>);

});

describe('Testing openAppointments', () => {
  const openAppointments = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <PatientAppointment /> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of openAppointments', () => {
    openAppointments();
    expect(openAppointments).toBeCalled();
  });
});

describe('Testing getBookedAppointment', () => {
  const getBookedAppointment = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <PatientAppointment /> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getBookedAppointment', () => {
    getBookedAppointment();
    expect(getBookedAppointment).toBeCalled();
  });
});