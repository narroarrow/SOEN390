import { render } from '@testing-library/react';
import EditInfoForm from '../pages/EditInfoForm.js';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });


test('Renders the EditInfoForm component', () => {
  localStorage.setItem('role', 'Patient');

  render(
    <BrowserRouter>
      <EditInfoForm />
    </BrowserRouter>
  );
});

describe('Testing EditInfoForm', () => {
  const editInfoForm = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><EditInfoForm editInfoForm={editInfoForm} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of EditInfoForm', () => {
    editInfoForm();
    expect(editInfoForm).toBeCalled();
  });
});
