import React from "react";
import Profile from "@/components/pages/Profile";
import { getBankAccount } from "@/apis/user.api";
import { notFound } from "next/navigation";
const Page = async () => {
  const bankAccount = await getBankAccount()
    .then((r) => r)
    .catch((err) => err);
  if (!bankAccount?.data) return notFound();
  return <Profile bankAccount={bankAccount} />;
};

export default Page;
