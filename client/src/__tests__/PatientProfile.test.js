import { render } from '@testing-library/react';
import PatientProfile from '../pages/PatientProfile.js';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });


test('Renders the PatientProfile component', () => {

  localStorage.setItem('role', 'Patient');

  render(
  <BrowserRouter>
  <PatientProfile />
  </BrowserRouter>);
});

describe('Testing PatientProfile', () => {
  const patientProfile = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><PatientProfile patientProfile={patientProfile} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of PatientProfile', () => {
    patientProfile();
    expect(patientProfile).toBeCalled();
  });
});
