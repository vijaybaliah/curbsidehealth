import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import RepoFilter from './RepoFilter';

describe('RepoFilter', () => {
  test('form submission with correct inputs', async () => {
    const mockSetFilter = jest.fn();
    const setSortOption = jest.fn();
    const defaultVisibility = 'PUBLIC';
    const defaultUser = 'testuser';

    const { getByPlaceholderText, getByText, queryByText } = render(
      <RepoFilter
        setFilter={mockSetFilter}
        sort=""
        setSortOption={setSortOption}
        defaultVisbility={defaultVisibility}
        defaultUser={defaultUser}
      />,
      {
        wrapper: BrowserRouter,
      },
    );

    const tokenInput = getByPlaceholderText('enter user token');

    await waitFor(() => {
      fireEvent.change(tokenInput, { target: { value: 'mytoken' } });
    });
    const nameInput = getByPlaceholderText('enter github user name');

    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: 'testuser' } });
    });

    await waitFor(() => {
      fireEvent.click(getByText('Filter'));
    });
    await waitFor(() => {
      expect(queryByText('This field is required!!!')).toBeFalsy();
    });
  });
});
