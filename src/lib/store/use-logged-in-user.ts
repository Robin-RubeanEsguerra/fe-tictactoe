import { create } from 'zustand';
import Cookies from 'js-cookie';
import { healthCheck } from '../services/auth';

type UseAuthUserState = {
  user: any;
  isAuthenticated: boolean;
};

type UseAuthAction = {
  setUser: (user: any) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  initializeAuth: () => void;
};

const initialState: UseAuthUserState = {
  user: null,
  isAuthenticated: false,
};

export const UseAuthStore = create<UseAuthUserState & UseAuthAction>()((set) => ({
  ...initialState,

  setUser: (user) => set({ user }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

initializeAuth: () => {
  const accessToken = Cookies.get('accessToken');
  const isTokenValid = !!accessToken;

  set((state) => {
    if (state.isAuthenticated === isTokenValid) {
      return state; // Don't trigger update
    }

    return { isAuthenticated: isTokenValid };
  });
}



}));
