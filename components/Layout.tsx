
import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusSquare, User as UserIcon, ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'Home', icon: <Home size={24} />, path: '/' },
    { name: 'Reserve', icon: <PlusSquare size={24} />, path: '/reserve' },
    { name: 'My', icon: <UserIcon size={24} />, path: '/my' },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname;
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }} 
              className="p-1 -ml-1 text-gray-600 active:bg-gray-100 rounded-full transition-colors focus:outline-none"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px]">{title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 h-16 flex items-center justify-around z-50">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== tab.path) {
                navigate(tab.path);
              }
            }}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-200 focus:outline-none ${
              isActive(tab.path) ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive(tab.path) ? 'scale-110' : 'scale-100'}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-medium">{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
