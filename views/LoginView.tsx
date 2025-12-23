
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LoginView: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('ユーザー名を入力してください');
      return;
    }
    login(name);
    navigate('/');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-indigo-600 flex flex-col items-center justify-center p-8">
      <div className="w-full text-white text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Robot Reserve</h1>
        <p className="opacity-80">ロボット配置予約プロトタイプ</p>
      </div>

      <div className="w-full bg-white rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">ログイン</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ユーザー名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="テストユーザー"
              className={`w-full p-4 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none`}
            />
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
          >
            ログイン
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            アカウントをお持ちでないですか？{' '}
            <br />
            <Link to="/auth/signup" className="text-indigo-600 font-bold hover:underline">
              新規登録
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-white opacity-50 text-[10px] text-center">
        <p>※ プロトタイプのため、パスワード認証は不要です。</p>
        <p>※ 任意のユーザー名でログインできます。</p>
      </div>
    </div>
  );
};

export default LoginView;
