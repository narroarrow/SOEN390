import { render } from '@testing-library/react';
import Footer from '../components/Footer';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

test('Renders the Footer component', () => {
  render(<Footer />);
});


describe('Testing StickyFooter', () => {
  const StickyFooter = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Footer StickyFooter={StickyFooter} />);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of StickyFooter', () => {
    StickyFooter();
    expect(StickyFooter).toBeCalled();
  });
});
