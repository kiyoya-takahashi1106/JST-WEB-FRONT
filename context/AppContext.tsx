
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Post, ReserveFormState } from '../types';
import { fetchPosts, createReservation } from '../api';

interface AppContextType {
  user: User | null;
  posts: Post[];
  reserveForm: ReserveFormState | null;
  isLoading: boolean; // 初期化中かどうか
  login: (name: string) => void;
  signup: (name: string) => void;
  logout: () => void;
  setReserveStep1: (form: ReserveFormState) => void;
  addPost: (post: Post) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reserveForm, setReserveForm] = useState<ReserveFormState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (e) {
      console.error("Failed to fetch posts", e);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        const storedUser = localStorage.getItem('robot_user');
        
        if (storedUser) setUser(JSON.parse(storedUser));
        
        await loadPosts();
      } catch (e) {
        console.error("Initialization failed", e);
      } finally {
        setIsLoading(false);
      }
    };
    initApp();
  }, []);

  const login = (name: string) => {
    const newUser = { uid: name.toLowerCase() + '_id', name };
    setUser(newUser);
    localStorage.setItem('robot_user', JSON.stringify(newUser));
  };

  const signup = (name: string) => {
    const newUser = { uid: 'u_' + Date.now(), name };
    setUser(newUser);
    localStorage.setItem('robot_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('robot_user');
  };

  const setReserveStep1 = (form: ReserveFormState) => {
    setReserveForm(form);
  };

  const addPost = async (post: Post) => {
    try {
      await createReservation(post);
      await loadPosts(); // Refresh posts after creation
      setReserveForm(null);
    } catch (e) {
      console.error("Failed to add post", e);
      throw e;
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      posts, 
      reserveForm, 
      isLoading, 
      login, 
      signup, 
      logout, 
      setReserveStep1, 
      addPost 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
