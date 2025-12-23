
export interface User {
  uid: string;
  name: string;
}

export interface Post {
  id: string;
  uid: string;
  organizer_name: string;
  title: string;
  event_place?: string;
  event_from_at?: string;
  event_to_at?: string;
  details?: string;
  sns?: string;
  sns_id?: string;
  display_place: string;
  display_from_at: string;
  display_to_at: string;
  created_at: string;
}

export interface RobotSlot {
  id: string;
  from: string;
  to: string;
  places: string[];
  crowdedPlace: string;
}

export interface ReserveFormState {
  organizer_name: string;
  title: string;
  event_place?: string;
  event_from_at?: string;
  event_to_at?: string;
  details?: string;
  sns?: string;
  sns_id?: string;
}
