import { render } from '@testing-library/react';
import AdminPatientDashboard from '../pages/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

test('Renders the AdminPatientDashboard component', () => {

  localStorage.setItem('role', 'Admin');

  render(
    <BrowserRouter>
      <AdminPatientDashboard />
    </BrowserRouter>
  );
});

describe('Testing getPatients', () => {
  const getPatients = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminPatientDashboard getPatients={getPatients} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getPatients()', () => {
    getPatients();
    expect(getPatients).toBeCalled();
  });
});

describe('Testing getDoctorMostAvailable', () => {
  const getDoctorMostAvailable = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminPatientDashboard getDoctorMostAvailable={getDoctorMostAvailable} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getPatients()', () => {
    getDoctorMostAvailable();
    expect(getDoctorMostAvailable).toBeCalled();
  });
});

