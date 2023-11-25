"use client";
import React from "react";

const initState = {
  user: {
    id: "",
    username: "",
    ticket_percent: 0,
    total_money: 0,
    image_profile: "",
    qr_code: "",
  },
  pool: {
    id: "",
    total_money: 0,
    ticket_percent: 0,
    pool_hotline: "",
  },
  deals: [],
  month_profit: 0,
  user_profit: 0,
  isAuth: false,
};

interface MainProviderProps {
  user: any;
  updateUser: (user: any) => void;
  resetUser: () => void;
}

export const MainContext = React.createContext<MainProviderProps>({
  user: initState,
  updateUser: () => {},
  resetUser: () => {},
});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  let userData = initState;
  const [user, setUser] = React.useState(initState);

  const updateUser = (data: any) => {
    userData = { ...data?.data, isAuth: true };
  };

  const resetUser = () => {
    userData = initState;
  };

  React.useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <MainContext.Provider
      value={{
        user,
        updateUser,
        resetUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
