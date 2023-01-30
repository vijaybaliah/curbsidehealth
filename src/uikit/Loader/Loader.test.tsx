import { render } from '@testing-library/react';
import Loader from './Loader';

test('renders Loader component', () => {
  const { getByTestId } = render(<Loader />);
  const loaderContainer = getByTestId('loader');
  expect(loaderContainer).toBeTruthy();
});
