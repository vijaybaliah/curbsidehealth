import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RepoListItem from './RepoListItem';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RepoListItem', () => {
  it('displays the repo name, archive status, and details button', () => {
    const { getByText } = render(
      <RepoListItem
        name="test-repo"
        id="123"
        isArchived={true}
        owner="test-user"
      />,
      {
        wrapper: BrowserRouter,
      },
    );

    expect(getByText('test-repo')).toBeTruthy();
    expect(getByText('archived')).toBeTruthy();
    const detailsButton = getByText('Details');
    expect(detailsButton).toBeTruthy();
    fireEvent.click(detailsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/repo/test-user/test-repo/123');
  });
});
