import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <Router>
      <div className="flex w-full mx-auto max-2xl:bg-indigo-300 2xl:w-[60%] 2xl:bg-orange-300  min-h-screen">
        <Sidebar />
        <AppRoutes />
      </div>
    </Router>
  );
}
