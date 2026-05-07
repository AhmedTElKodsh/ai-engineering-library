import { Outlet } from 'react-router-dom';
import GlobalNavigation from './GlobalNavigation';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;