import { createBrowserRouter } from 'react-router-dom';
import RepoList from '../repolistpage/RepoList';

const appRoutes = [
  {
    path: '/',
    element: <RepoList />,
  },
];

export const router = createBrowserRouter(appRoutes, {
  basename: '/curbsidehealth',
});
