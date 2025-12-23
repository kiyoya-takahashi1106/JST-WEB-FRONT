
import { RobotSlot, Post } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    uid: 'u1',
    organizer_name: 'ロボット研究会',
    title: '最新AIロボットデモ展示',
    event_place: '学生ホール',
    event_from_at: '2025-06-01T10:00',
    event_to_at: '2025-06-01T16:00',
    details: '自律走行ロボットの最新モデルを展示します。',
    display_place: '食堂前',
    display_from_at: '2025-06-01T09:00',
    display_to_at: '2025-06-01T17:00',
    created_at: '2025-05-20T12:00:00Z',
  },
  {
    id: 'p2',
    uid: 'u2',
    organizer_name: '学園祭実行委員',
    title: '学園祭案内ロボ',
    event_place: 'キャンパス全域',
    event_from_at: '2025-10-10T09:00',
    event_to_at: '2025-10-11T18:00',
    details: 'ロボットが学内の各施設を案内します。',
    display_place: '中庭',
    display_from_at: '2025-10-10T08:00',
    display_to_at: '2025-10-11T19:00',
    created_at: '2025-05-21T15:00:00Z',
  }
];

export const MOCK_SLOTS: RobotSlot[] = [
  {
    id: 's1',
    from: '2025-07-01T09:00',
    to: '2025-07-01T17:00',
    places: ['講堂', '食堂', '中庭'],
    crowdedPlace: '食堂'
  },
  {
    id: 's2',
    from: '2025-07-02T09:00',
    to: '2025-07-02T17:00',
    places: ['講堂', '食堂', '図書館'],
    crowdedPlace: '図書館'
  },
  {
    id: 's3',
    from: '2025-07-03T09:00',
    to: '2025-07-03T17:00',
    places: ['中庭', '正門前', '食堂'],
    crowdedPlace: '正門前'
  }
];
