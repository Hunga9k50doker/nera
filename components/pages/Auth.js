"use client";
import React from "react";
import { MainContext } from "@/context/MainContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Auth = ({ userData }) => {
  const { updateUser } = React.useContext(MainContext);
  const router = useRouter();

  if (userData && userData?.status < 300) updateUser(userData);
  else {
    toast(userData?.message, {
      type: userData?.type || "error",
    });
    setTimeout(() => {
      router.replace("/sign-in");
    }, 1000);
  }
  return <></>;
};

export default React.memo(Auth);
