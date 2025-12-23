
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Calendar, MapPin, User as UserIcon, Globe, Info } from 'lucide-react';

const PostDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = useApp();
  
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout title="投稿詳細" showBack>
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2 leading-snug">{post.title}</h2>
          <div className="flex items-center gap-2 opacity-90 text-sm">
            <UserIcon size={16} />
            <span>{post.organizer_name}</span>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Robot Display Info */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Globe size={18} />
              </div>
              <h3 className="font-bold text-gray-900">🤖 ロボット配置情報</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">設置場所</p>
                  <p className="font-bold text-indigo-600">{post.display_place}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">期間</p>
                  <p className="text-sm font-medium">
                    {new Date(post.display_from_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Event Details */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Info size={18} />
              </div>
              <h3 className="font-bold text-gray-900">イベント詳細</h3>
            </div>
            <div className="space-y-4">
              {post.details && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.details}
                </p>
              )}
              
              <div className="space-y-2">
                {post.event_place && (
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">開催場所</p>
                      <p className="text-sm font-medium">{post.event_place}</p>
                    </div>
                  </div>
                )}
                {post.event_from_at && (
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">開催日時</p>
                      <p className="text-sm font-medium">
                        {new Date(post.event_from_at).toLocaleString('ja-JP', { dateStyle: 'medium', timeStyle: 'short' })}
                        {post.event_to_at && ` 〜 ${new Date(post.event_to_at).toLocaleTimeString('ja-JP', { timeStyle: 'short' })}`}
                      </p>
                    </div>
                  </div>
                )}
                {(post.sns || post.sns_id) && (
                  <div className="flex items-start gap-3">
                    <Globe size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">SNS情報</p>
                      <p className="text-sm font-medium">
                        {post.sns} {post.sns_id && `@${post.sns_id}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailView;
