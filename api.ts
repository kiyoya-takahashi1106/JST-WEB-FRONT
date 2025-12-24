import { API_BASE_URL } from './constants';
import { Post, ReserveFormState } from './types';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  return data.posts;
};

export const createReservation = async (postData: Post): Promise<void> => {
  // Convert empty strings to null for optional fields and ensure dates are proper ISO strings if needed
  const sanitize = (value: any) => (value === '' ? null : value);

  const payload = {
    uid: postData.uid,
    organizer_name: postData.organizer_name,
    title: postData.title,
    event_place: sanitize(postData.event_place),
    event_from_at: sanitize(postData.event_from_at),
    event_to_at: sanitize(postData.event_to_at),
    details: sanitize(postData.details),
    sns: sanitize(postData.sns),
    sns_id: sanitize(postData.sns_id),
    display_place: postData.display_place,
    display_from_at: postData.display_from_at,
    display_to_at: postData.display_to_at,
  };

  const response = await fetch(`${API_BASE_URL}/reservation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("API Error:", errorData);
    throw new Error('Failed to create reservation');
  }
};
