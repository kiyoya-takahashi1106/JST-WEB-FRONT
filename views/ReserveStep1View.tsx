
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ReserveFormState } from '../types';

const ReserveStep1View: React.FC = () => {
  const navigate = useNavigate();
  const { reserveForm, setReserveStep1 } = useApp();

  const [form, setForm] = useState<ReserveFormState>(reserveForm || {
    organizer_name: '',
    title: '',
    event_place: '',
    event_from_at: '',
    event_to_at: '',
    details: '',
    sns: '',
    sns_id: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReserveFormState, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ReserveFormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof ReserveFormState, string>> = {};
    if (!form.organizer_name) newErrors.organizer_name = '主催者名は必須です';
    if (!form.title) newErrors.title = 'タイトルは必須です';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // スムーズなスクロール
      const firstError = document.querySelector('.border-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setReserveStep1(form);
    navigate('/reserve/step2');
  };

  return (
    <Layout title="予約投稿 (1/2)">
      {/* ステップインジケーター */}
      <div className="mb-6 flex items-center justify-between px-2">
        <div className="flex-1 text-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-1 shadow-md shadow-indigo-200">1</div>
          <span className="text-[10px] font-bold text-indigo-600">入力</span>
        </div>
        <div className="flex-grow h-[2px] bg-gray-200 mb-4 mx-2"></div>
        <div className="flex-1 text-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto mb-1">2</div>
          <span className="text-[10px] font-bold text-gray-400">配置設定</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pb-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-indigo-600 mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
              必須項目
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">主催者名 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="organizer_name"
                  value={form.organizer_name}
                  onChange={handleChange}
                  placeholder="例: ロボット研究会"
                  className={`w-full p-3.5 rounded-xl border ${errors.organizer_name ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-indigo-600 focus:ring-0 outline-none transition-all text-sm`}
                />
                {errors.organizer_name && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.organizer_name}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">タイトル <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="例: ロボットデモ2025"
                  className={`w-full p-3.5 rounded-xl border ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-indigo-600 focus:ring-0 outline-none transition-all text-sm`}
                />
                {errors.title && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.title}</p>}
              </div>
            </div>
          </section>

          <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              任意項目
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">イベント場所</label>
                <input
                  type="text"
                  name="event_place"
                  value={form.event_place}
                  onChange={handleChange}
                  placeholder="例: 学生ホール"
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-indigo-600 outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">開始日時</label>
                  <input
                    type="datetime-local"
                    name="event_from_at"
                    value={form.event_from_at}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-600 outline-none text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">終了日時</label>
                  <input
                    type="datetime-local"
                    name="event_to_at"
                    value={form.event_to_at}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-600 outline-none text-[11px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">詳細内容</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={3}
                  placeholder="イベントの詳細内容を記入してください"
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-indigo-600 outline-none text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">SNS</label>
                  <select
                    name="sns"
                    value={form.sns}
                    onChange={(e: any) => handleChange(e)}
                    className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-indigo-600 outline-none bg-white text-sm"
                  >
                    <option value="">選択なし</option>
                    <option value="X">X (Twitter)</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">SNS ID</label>
                  <input
                    type="text"
                    name="sns_id"
                    value={form.sns_id}
                    onChange={handleChange}
                    placeholder="@id"
                    className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-indigo-600 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all"
        >
          配置設定へ進む
        </button>
      </form>
    </Layout>
  );
};

export default ReserveStep1View;
