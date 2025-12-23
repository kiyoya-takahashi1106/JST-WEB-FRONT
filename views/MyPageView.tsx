
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { LogOut, Calendar, MapPin, ChevronRight, User as UserIcon } from 'lucide-react';

const MyPageView: React.FC = () => {
  const navigate = useNavigate();
  const { user, posts, logout } = useApp();

  const myPosts = posts.filter(post => post.uid === user?.uid);

  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      logout();
      navigate('/auth/login');
    }
  };

  return (
    <Layout title="マイページ">
      <div className="space-y-8">
        {/* User Profile */}
        <section className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <UserIcon size={32} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">ログイン中</p>
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-[10px] text-gray-400">UID: {user?.uid}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </section>

        {/* My Posts */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-gray-900">自分の投稿</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {myPosts.length} 件
            </span>
          </div>

          <div className="space-y-3">
            {myPosts.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 border border-dashed border-gray-200 text-center">
                <p className="text-sm text-gray-400 mb-4">まだ投稿がありません</p>
                <Link 
                  to="/reserve"
                  className="inline-block text-xs font-bold text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg active:bg-indigo-50"
                >
                  最初の予約を作成する
                </Link>
              </div>
            ) : (
              myPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/posts/${post.id}`}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors"
                >
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{post.title}</h4>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <MapPin size={10} />
                        <span>{post.display_place}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Calendar size={10} />
                        <span>{new Date(post.display_from_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300" />
                </Link>
              ))
            )}
          </div>
        </section>

        {/* App Settings Mock */}
        <section>
          <h3 className="font-bold text-gray-900 mb-4 px-1">設定</h3>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 text-left active:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">通知設定</span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 text-left active:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">プライバシーポリシー</span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 text-left active:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">利用規約</span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </section>

        <div className="text-center pb-8">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Robot Reservation v1.0.0</p>
        </div>
      </div>
    </Layout>
  );
};

export default MyPageView;
