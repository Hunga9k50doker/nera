"use client";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Space,
  Form,
  Input,
  Typography,
} from "antd";
import {
  UnlockOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { deleteCookie } from "cookies-next";
import React from "react";
import { MainContext } from "@/context/MainContext";
import { formatDefault, numberWithCommas } from "@/utils";
import { toast } from "react-toastify";
import { useModalContext } from "@/context/ModalContext";
import ModalConfirm from "@/components/modal/ModalConfirm";
import ModalInfo from "@/components/modal/ModalInfo";
import { logoutAction, updatePasswordAcction } from "@/actions";
import Privacy from "@/components/Privacy";
function Profile({ bankAccount = null }: any) {
  const { Text } = Typography;
  const modalId = "modal-confirm";
  const modalIdLogout = "modal-logout";
  const modalIdPrivacy = "modal-privacy";

  const { user } = React.useContext(MainContext);
  const [bankData, setBankData] = React.useState<any>();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { showModal, hideModal } = useModalContext();
  const btnSubmitRef = React.useRef<any>();
  const [form] = Form.useForm();

  const onLogout = React.useCallback(async () => {
    setConfirmLoading(true);
    const data = await logoutAction();
    setConfirmLoading(false);
    hideModal(modalIdLogout);
    toast(data?.message, {
      type: data?.type,
    });
  }, [confirmLoading]);

  const onFinish = React.useCallback(async (values: any) => {
    setConfirmLoading(true);
    const data = await updatePasswordAcction(values);
    setConfirmLoading(false);
    hideModal(modalId);
    form.resetFields();
    toast(data?.message, {
      type: data?.type,
    });
    toast("Vui lòng đăng nhập lại", {
      type: "success",
    });
    setTimeout(() => {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      window.location.replace("/sign-in");
    }, 1000);
  }, []);

  const onFinishFailed = () => {};

  const handleCall = React.useCallback(() => {
    window.open(`tel:${user.pool.hotline}`);
  }, [user]);

  React.useEffect(() => {
    if (bankAccount) {
      if (bankAccount?.status < 300) {
        return setBankData(bankAccount.data);
      } else {
        toast(bankAccount?.message, {
          type: bankAccount?.type,
        });
      }
    }
  }, [bankAccount]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <Row gutter={[24, 0]}>
            <Col xs={24} className="mb-24">
              <Card title={"Hồ sơ"} bordered={false}>
                <Descriptions>
                  <Descriptions.Item label="UID">
                    {user.user.username}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item label="Tài sản ròng">
                    {numberWithCommas(user.user.total_money)} VND
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item label="% Pool nắm giữ">
                    {formatDefault(user.user.ticket_percent * 100)}%
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col xs={24} className="mb-24">
              <Card
                className="header-solid h-full"
                bordered={false}
                title={[
                  <h6 key={0} className="font-semibold m-0">
                    Tài khoản ngân hàng
                  </h6>,
                ]}
                bodyStyle={{ paddingTop: "0" }}
              >
                <Row gutter={[24, 24]}>
                  {bankData &&
                    bankData.map((i: any, index: any) => (
                      <Col span={24} key={index}>
                        <Card className="card-billing-info" bordered={false}>
                          <div className="col-info">
                            <Descriptions title={i.bank_name}>
                              <Descriptions.Item label="Tên tài khoản" span={3}>
                                {i.bank_user_name}
                              </Descriptions.Item>
                              <Descriptions.Item label="Số tài khoản" span={3}>
                                {i.bank_account_number}
                              </Descriptions.Item>
                              <Descriptions.Item label="Ngân hàng" span={3}>
                                {i.bank_shortname}
                              </Descriptions.Item>
                            </Descriptions>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  {!bankData && <Text>Chưa có thông tin!</Text>}
                </Row>
                <Text>
                  (*)Để cập nhật và thay đổi tài khoản ngân hàng, vui lòng liên
                  hệ trực tiếp với chúng tôi!
                </Text>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bodyStyle={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[
              <h6 key={0} className="font-semibold m-0">
                Thông tin khác
              </h6>,
            ]}
          >
            <List itemLayout="vertical" className="invoice-list">
              <List.Item>
                <Button
                  onClick={() => showModal(modalId)}
                  className="flex items-center w-full"
                >
                  <Space>
                    <UnlockOutlined />
                    Thay đổi mã pin
                  </Space>
                </Button>
              </List.Item>
              <List.Item>
                <Button
                  onClick={() => showModal(modalIdPrivacy)}
                  className="flex items-center w-full"
                >
                  <Space>
                    <SafetyCertificateOutlined />
                    Quy đinh chính sách
                  </Space>
                </Button>
              </List.Item>
              <List.Item>
                <Button
                  onClick={handleCall}
                  className="flex items-center w-full"
                >
                  <Space>
                    <WhatsAppOutlined />
                    Hotline: {user.pool.hotline}
                  </Space>
                </Button>
              </List.Item>
              <List.Item>
                <Button
                  onClick={() => showModal(modalIdLogout)}
                  className="flex items-center w-full"
                >
                  <Space>
                    <LogoutOutlined />
                    Đăng xuất
                  </Space>
                </Button>
              </List.Item>
            </List>
          </Card>
        </Col>
        <ModalConfirm
          confirmLoading={confirmLoading}
          modalId={modalId}
          title={"Thay đổi mã pin"}
          callBack={() => btnSubmitRef?.current?.click()}
          okText="Cập nhật"
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Mã pin cũ"
              name="current_password"
              rules={[
                {
                  required: true,
                  message: "Pass không được để trống!",
                },
              ]}
            >
              <Input.Password maxLength={4} />
            </Form.Item>
            <Form.Item
              label="Mã pin mới"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: "Pass không được để trống!",
                },
              ]}
            >
              <Input.Password maxLength={4} />
            </Form.Item>
            <Form.Item
              label="Mã pin mới"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Pass không được để trống!",
                },
              ]}
            >
              <Input.Password maxLength={4} />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              ref={btnSubmitRef}
              style={{
                display: "none",
              }}
            >
              Cập nhật
            </Button>
          </Form>
        </ModalConfirm>
        <ModalConfirm
          confirmLoading={confirmLoading}
          modalId={modalIdLogout}
          title={"Đăng xuất"}
          okText="Xác nhận"
          type="danger"
          callBack={onLogout}
        >
          <Text className="text-center w-full" type="danger">
            Xác nhận đăng xuất!
          </Text>
        </ModalConfirm>
        <ModalInfo modalId={modalIdPrivacy} title={"Quy đinh chính sách"}>
          <Privacy />
        </ModalInfo>
      </Row>
    </>
  );
}

export default React.memo(Profile);
