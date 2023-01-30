import { createBrowserRouter } from 'react-router-dom';
import RepoList from '../repolistpage/RepoList';
import RepoDetailsPage from '../repodetailspage/RepoDetailsPage';

const appRoutes = [
  {
    path: '/',
    element: <RepoList />,
  },
  {
    path: '/repo/:owner/:name/:id',
    element: <RepoDetailsPage />,
  },
];

export const router = createBrowserRouter(appRoutes, {
  basename: '/curbsidehealth',
});
