import { createBrowserRouter } from 'react-router-dom';
import RepoList from '../repolistpage/RepoList';
import RepoDetailsPage from '../repodetailspage/RepoDetailsPage';
import RepoCreatePage from '../repocreatepage/RepoCreatePage';

const appRoutes = [
  {
    path: '/',
    element: <RepoList />,
  },
  {
    path: '/repo/:owner/:name/:id',
    element: <RepoDetailsPage />,
  },
  {
    path: '/repo/create',
    element: <RepoCreatePage />,
  },
];

export const router = createBrowserRouter(appRoutes, {
  basename: '/curbsidehealth',
});
