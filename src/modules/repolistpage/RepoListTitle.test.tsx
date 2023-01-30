import { render } from '@testing-library/react';
import RepoListTitle from './RepoListTitle';

test('renders title', () => {
  const title = 'Repository Title';
  const { getByText } = render(<RepoListTitle>{title}</RepoListTitle>);
  const titleElement = getByText(title);
  expect(titleElement).toBeTruthy();
});
