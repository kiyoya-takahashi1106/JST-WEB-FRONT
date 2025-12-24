
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SignupView: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('ユーザー名を入力してください');
      return;
    }
    signup(name);
    navigate('/');
  };
  

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-2 tracking-tight">Robot Reserve</h1>
        <p className="text-gray-400">新しい体験をここから</p>
      </div>

      <div className="w-full bg-gray-50 rounded-3xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">新規登録</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">表示名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="あなたの名前"
              className={`w-full p-4 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} bg-white focus:ring-2 focus:ring-indigo-500 outline-none`}
            />
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
          >
            アカウントを作成
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            すでにアカウントを持っていますか？{' '}
            <br />
            <Link to="/auth/login" className="text-indigo-600 font-bold hover:underline">
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
