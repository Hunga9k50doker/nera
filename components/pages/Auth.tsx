"use client";
import React from "react";
import { MainContext } from "@/context/MainContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCookieAction } from "@/actions";

const Auth = ({ userData = null }: any) => {
  const { updateUser } = React.useContext(MainContext);
  const router = useRouter();

  React.useEffect(() => {
    if (userData && userData?.status < 300) updateUser(userData);
    else {
      toast(userData?.message, {
        type: userData?.type || "error",
      });
      if (userData?.status === 401) {
        clearCookieAction();
        return router.replace("/sign-in");
      }
    }
  }, []);
  return null;
};

export default React.memo(Auth);
