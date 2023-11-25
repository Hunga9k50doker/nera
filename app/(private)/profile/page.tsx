import React from "react";
import Profile from "@/components/pages/Profile";
import { getBankAccount } from "@/apis/user.api";
const Page = async () => {
  const bankAccount = await getBankAccount()
    .then((r) => r)
    .catch((err) => err);
  return <Profile bankAccount={bankAccount} />;
};

export default Page;
