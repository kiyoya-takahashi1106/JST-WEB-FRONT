
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { MOCK_SLOTS } from '../constants';
import { RobotSlot, Post } from '../types';
import { Check, Zap, Loader2, ChevronDown, MapPin, Sparkles } from 'lucide-react';

const ReserveStep2View: React.FC = () => {
  const navigate = useNavigate();
  const { reserveForm, user, addPost } = useApp();

  const [selectedSlot, setSelectedSlot] = useState<RobotSlot | null>(MOCK_SLOTS[0]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!reserveForm) {
    return <Navigate to="/reserve" replace />;
  }

  // スロットが変更されたら選択値をリセット
  useEffect(() => {
    setSelectedValue('');
  }, [selectedSlot]);

  const handleSubmit = async () => {
    if (!selectedSlot || !selectedValue || !user) return;

    setIsSubmitting(true);
    
    // 実際の配置場所を決定（おまかせの場合は crowdedPlace を使用）
    const finalPlace = selectedValue === 'AUTO' ? selectedSlot.crowdedPlace : selectedValue;

    // 擬似的なネットワーク遅延
    await new Promise(resolve => setTimeout(resolve, 1200));

    const newPost: Post = {
      ...reserveForm,
      id: 'p' + Date.now(),
      uid: user.uid,
      display_place: finalPlace,
      display_from_at: selectedSlot.from,
      display_to_at: selectedSlot.to,
      created_at: new Date().toISOString(),
    };

    addPost(newPost);
    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <Layout title="予約投稿 (2/2)" showBack>
      {/* ステップインジケーター */}
      <div className="mb-6 flex items-center justify-between px-2">
        <div className="flex-1 text-center">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-1">
            <Check size={16} />
          </div>
          <span className="text-[10px] font-bold text-indigo-300">入力完了</span>
        </div>
        <div className="flex-grow h-[2px] bg-indigo-600 mb-4 mx-2"></div>
        <div className="flex-1 text-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-1 shadow-md shadow-indigo-200">2</div>
          <span className="text-[10px] font-bold text-indigo-600">配置設定</span>
        </div>
      </div>

      <div className="space-y-8 pb-8">
        {/* 1. スロット選択 */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
            ロボット空き枠を選択
          </h3>
          <div className="space-y-2">
            {MOCK_SLOTS.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedSlot?.id === slot.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                    : 'border-gray-100 bg-white hover:border-indigo-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-500 mb-1 uppercase tracking-wider">
                      {new Date(slot.from).toLocaleDateString('ja-JP', { weekday: 'short', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {new Date(slot.from).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} 〜 
                      {new Date(slot.to).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${selectedSlot?.id === slot.id ? 'bg-indigo-600 text-white scale-110' : 'bg-gray-100 text-gray-300'}`}>
                    <Check size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. 配置場所の決定方法 */}
        <section className={`space-y-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 delay-150 ${selectedSlot ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
            配置場所を決定
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {/* AIレコメンドボタン */}
            <button
              onClick={() => setSelectedValue('AUTO')}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedValue === 'AUTO' 
                  ? 'border-amber-500 bg-amber-50 shadow-md ring-1 ring-amber-500' 
                  : 'border-gray-100 bg-white hover:border-amber-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors ${selectedValue === 'AUTO' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
                <Sparkles size={24} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">AIおまかせレコメンド</p>
                <p className="text-[11px] text-gray-500">最も人が多い場所をAIが自動選択します</p>
              </div>
              {selectedValue === 'AUTO' && <Check size={18} className="ml-auto text-amber-600" />}
            </button>

            {/* 区切り線 */}
            <div className="relative flex items-center py-2 px-4">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* 個別指定プルダウン */}
            <div className="relative">
              <label className="block text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">個別に指定する</label>
              <div className="relative">
                <select
                  value={selectedValue === 'AUTO' ? '' : selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className={`w-full p-4 pr-12 rounded-2xl border-2 bg-white text-gray-900 font-bold appearance-none outline-none transition-all ${
                    selectedValue !== '' && selectedValue !== 'AUTO' 
                      ? 'border-indigo-600 bg-indigo-50 shadow-sm ring-1 ring-indigo-600' 
                      : 'border-gray-100 hover:border-indigo-300'
                  }`}
                >
                  <option value="" disabled>場所をリストから選択</option>
                  {selectedSlot?.places.map(place => (
                    <option key={place} value={place}>{place}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* プレビュー表示 */}
          {selectedValue && (
            <div className="mt-6 animate-in fade-in zoom-in-95 duration-300">
              {selectedValue === 'AUTO' ? (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-200">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-900 mb-1">AI最適化配置</h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      現在の混雑予想に基づき、<span className="font-extrabold underline decoration-2 decoration-amber-300">「{selectedSlot?.crowdedPlace}」</span>にロボットを配置します。リーチ数が最大化されます。
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-900 mb-1">指定場所への配置</h4>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                      ご指定いただいた<span className="font-extrabold underline decoration-2 decoration-indigo-300">「{selectedValue}」</span>にロボットを配置します。特定のターゲットに訴求する際に有効です。
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 送信ボタン */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedSlot || !selectedValue || isSubmitting}
            className={`w-full text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
              !selectedSlot || !selectedValue || isSubmitting
                ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>予約を確定中...</span>
              </>
            ) : (
              <>
                <Check size={24} />
                <span>この内容で予約を確定する</span>
              </>
            )}
          </button>
          <div className="mt-6 flex items-start gap-3 px-2">
            <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center mt-0.5 shrink-0">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              予約確定後、マイページから配置状況を確認できるようになります。配置時間の1時間前まではキャンセル可能です。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReserveStep2View;
