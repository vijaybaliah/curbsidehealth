import { RouterProvider } from 'react-router-dom';
import { router } from './modules/routes/AppRouter';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
