import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RepoCreatePage from './RepoCreatePage';
import { REPOSITORY_CREATE_MUTATION } from './repocreatepagegql/repocreatepage.gql';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';

const description = 'test-repo-description';
const repo = 'test-repo';
const namePlaceholder = 'Enter repo name';

const mocks = [
  {
    request: {
      query: REPOSITORY_CREATE_MUTATION,
      variables: {
        name: repo,
        description,
        visibility: 'PUBLIC',
      },
    },
    result: {
      data: {
        createRepository: {
          id: '1',
          name: repo,
          description,
          visibility: 'PUBLIC',
        },
      },
    },
  },
];

describe('RepoCreatePage component', () => {
  it('renders input fields and select option with correct label and value', async () => {
    const { getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoCreatePage />
      </MockedProvider>,
      {
        wrapper: BrowserRouter,
      },
    );

    expect(getByPlaceholderText(namePlaceholder)).toBeTruthy();
    expect(getByPlaceholderText('Enter repo description')).toBeTruthy();
  });

  it('displays error message when name field is not filled in', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoCreatePage />
      </MockedProvider>,
      {
        wrapper: BrowserRouter,
      },
    );

    const nameInput = getByPlaceholderText(namePlaceholder);
    const submitButton = getByText('submit');

    act(() => {
      fireEvent.change(nameInput, { target: { value: '' } });
    });
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByText('This field is required!!!')).toBeTruthy();
    });
  });

  it('submits the form and display success message', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoCreatePage />
      </MockedProvider>,
      {
        wrapper: BrowserRouter,
      },
    );

    const nameInput = getByPlaceholderText(namePlaceholder);
    const descriptionInput = getByPlaceholderText('Enter repo description');
    const submitButton = getByText('submit');

    act(() => {
      fireEvent.change(nameInput, { target: { value: repo } });
    });

    act(() => {
      fireEvent.change(descriptionInput, {
        target: { value: description },
      });
    });
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(queryByText('This field is required!!!')).toBeFalsy();
    });
  });
});
