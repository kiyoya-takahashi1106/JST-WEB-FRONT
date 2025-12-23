
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Calendar, MapPin, User as UserIcon } from 'lucide-react';

const HomeView: React.FC = () => {
  const { posts } = useApp();

  return (
    <Layout title="ホーム">
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p>投稿がありません</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/posts/${post.id}`}
              className="block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm active:scale-[0.98] transition-all hover:shadow-md"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">
                    {post.display_place}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {post.title}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <UserIcon size={14} className="text-gray-400" />
                    <span>{post.organizer_name}</span>
                  </div>
                  {post.event_place && (
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{post.event_place}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-xs">
                      {new Date(post.display_from_at).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })} 〜
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </Layout>
  );
};

export default HomeView;
