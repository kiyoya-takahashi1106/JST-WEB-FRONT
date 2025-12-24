
import { RobotSlot, Post } from './types';

export const API_BASE_URL = 'http://localhost:8000';

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
