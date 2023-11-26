"use client";
import { loginAction } from "@/actions";
import { Card, Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
const Login = () => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const onFinish = async (values: any) => {
    setConfirmLoading(true);
    const res = await loginAction(values);
    setConfirmLoading(false);
    toast(res?.message, {
      type: res?.type || "success",
    });
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  };

  const onFinishFailed = () => {};
  return (
    <Card
      className="max-w-[600px]"
      style={{
        margin: "auto",
        marginTop: 60,
      }}
    >
      <Form
        onFinish={onFinish}
        action={onFinish}
        name="basic"
        labelCol={{ span: 4 }}
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
        wrapperCol={{ span: 16 }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="UID"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập UID!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="PIN"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password maxLength={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
