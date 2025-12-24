
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import HomeView from './views/HomeView';
import PostDetailView from './views/PostDetailView';
import ReserveStep1View from './views/ReserveStep1View';
import ReserveStep2View from './views/ReserveStep2View';
import MyPageView from './views/MyPageView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';

// 認証ガード: 初期化中または未ログイン時の処理
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useApp();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/auth/login" element={<LoginView />} />
      <Route path="/auth/signup" element={<SignupView />} />
      <Route path="/posts/:id" element={<PostDetailView />} />
      
      {/* 予約 */}
      <Route 
        path="/reserve" 
        element={
          <ProtectedRoute>
            <ReserveStep1View />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reserve/step2" 
        element={
          <ProtectedRoute>
            <ReserveStep2View />
          </ProtectedRoute>
        } 
      />
      
      {/* マイページ */}
      <Route 
        path="/my" 
        element={
          <ProtectedRoute>
            <MyPageView />
          </ProtectedRoute>
        } 
      />
      
      {/* リダイレクト設定 */}
      <Route path="/mypage" element={<Navigate to="/my" replace />} />
      <Route path="/reserve/step1" element={<Navigate to="/reserve" replace />} />
      
      {/* その他 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
