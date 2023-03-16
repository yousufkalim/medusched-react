// Init
import React, { useContext, useState, createContext, ReactNode } from 'react';
import User from '../types/user';
import Elective from '../types/elective';

// Initializing Create Context Hook
interface StoreType {
  loggedIn?: boolean;
  user?: User | null;
  electives?: Elective[] | [];
}
const storeContext = createContext<StoreType | null>(null);

type UpdateStoreType = (data: StoreType) => void;
const storeUpdateContext = createContext<UpdateStoreType | null>(null);

// We are also initializing useContexts here
// we only call these functions where we need that data
export const Store = (): StoreType | null => {
  return useContext(storeContext);
};

export const UpdateStore = (): UpdateStoreType | null => {
  return useContext(storeUpdateContext);
};

// Initializing Store Provider
export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initializing State
  const [store, setStore] = useState<StoreType>({
    loggedIn: false,
    user: null,
    electives: [],
  });

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const updateStore = (data: StoreType): void => {
    setStore((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={updateStore}>{children}</storeUpdateContext.Provider>
    </storeContext.Provider>
  );
};
