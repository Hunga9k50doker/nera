"use client";
import { Card, Flex, Button } from "antd";
export default function NotFound() {
  return (
    <Card
      className="max-w-[600px]"
      style={{
        margin: "auto",
        marginTop: 60,
      }}
    >
      <Flex vertical justify="center" gap={8} align="center">
        <h2 className="text-center">404!</h2>
        <p className="text-center">Không tìm thấy trang!</p>
        <Button type="primary" className="w-[100px]" href="/">
          Trang chủ
        </Button>
      </Flex>
    </Card>
  );
}
