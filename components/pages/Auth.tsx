"use client";
import React from "react";
import { MainContext } from "@/context/MainContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions";

const Auth = ({ userData = null }: any) => {
  const { updateUser } = React.useContext(MainContext);
  const router = useRouter();

  const onLogout = React.useCallback(async () => {
    return await logoutAction();
  }, []);

  React.useEffect(() => {
    if (userData && userData?.status < 300) updateUser(userData);
    else {
      console.log("logout");
      toast(userData?.message, {
        type: userData?.type || "error",
      });
      // onLogout();
      // router.replace("/sign-in");
      // router.refresh();
      // if (userData?.status === 401) return router.replace("/sign-in");
    }
  }, []);
  return <></>;
};

export default React.memo(Auth);
