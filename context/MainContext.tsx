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

const initStateNoti = {
  data: [],
  page_index: 0,
  total_page: 0,
  total_records: 0,
};

interface MainProviderProps {
  user: any;
  notification: any;
  updateUser: (user: any) => void;
  updateNotification: (user: any) => void;
  resetUser: () => void;
}

export const MainContext = React.createContext<MainProviderProps>({
  user: initState,
  notification: null,
  updateUser: () => {},
  updateNotification: () => {},
  resetUser: () => {},
});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  let userData = initState;
  let noficationData = initStateNoti;
  const [user, setUser] = React.useState(initState);
  const [notification, setNotification] = React.useState(initStateNoti);

  const updateUser = (data: any) => {
    userData = { ...data?.data, isAuth: true };
  };

  const updateNotification = (data: any) => {
    noficationData = data;
  };

  const resetUser = () => {
    userData = initState;
  };

  React.useEffect(() => {
    setUser(userData);
  }, [userData]);

  React.useEffect(() => {
    setNotification(noficationData);
  }, [noficationData]);

  return (
    <MainContext.Provider
      value={{
        user,
        notification,
        updateUser,
        updateNotification,
        resetUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
