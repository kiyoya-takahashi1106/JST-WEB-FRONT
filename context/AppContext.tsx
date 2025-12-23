
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Post, ReserveFormState } from '../types';
import { INITIAL_POSTS } from '../constants';

interface AppContextType {
  user: User | null;
  posts: Post[];
  reserveForm: ReserveFormState | null;
  isLoading: boolean; // 初期化中かどうか
  login: (name: string) => void;
  signup: (name: string) => void;
  logout: () => void;
  setReserveStep1: (form: ReserveFormState) => void;
  addPost: (post: Post) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reserveForm, setReserveForm] = useState<ReserveFormState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = () => {
      try {
        const storedUser = localStorage.getItem('robot_user');
        const storedPosts = localStorage.getItem('robot_posts');
        
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        } else {
          setPosts(INITIAL_POSTS);
        }
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

  const addPost = (post: Post) => {
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('robot_posts', JSON.stringify(updatedPosts));
    setReserveForm(null);
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
