"use client";
import { clearCookieAction } from "@/actions";
import { Card, Flex, Button } from "antd";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const redirectLogin = async () => {
    await clearCookieAction();
    router.push("/sign-in");
  };
  return (
    <Card
      className="max-w-[600px]"
      style={{
        margin: "auto",
        marginTop: 60,
      }}
    >
      <Flex vertical justify="center" gap={8} align="center">
        <h2 className="text-center">401!</h2>
        <p className="text-center">
          Hết hạn đăng nhập, vui lòng đăng nhập lại!
        </p>
        <Button type="primary" className="w-[100px]" onClick={redirectLogin}>
          Đăng nhập
        </Button>
      </Flex>
    </Card>
  );
}
