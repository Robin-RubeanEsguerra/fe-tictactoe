import { create } from 'zustand';
import Cookies from 'js-cookie';

type UseAuthUserState = {
  isAuthenticated: boolean;
};

type UseAuthAction = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  initializeAuth: () => void;
};

const initialState: UseAuthUserState = {
  isAuthenticated: false,
};

export const UseAuthStore = create<UseAuthUserState & UseAuthAction>()((set) => ({
  ...initialState,


  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

initializeAuth: () => {
  const accessToken = Cookies.get('accessToken');
  const isTokenValid = !!accessToken;

  set((state) => {
    if (state.isAuthenticated === isTokenValid) {
      return state;
    }

    return { isAuthenticated: isTokenValid };
  });
}



}));
