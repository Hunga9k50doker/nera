"use client";
import React, { useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  Typography,
  Divider,
  theme,
  Flex,
} from "antd";
import Link from "next/link";
import { MainContext } from "@/context/MainContext";
import { getFromNowShort } from "@/utils";
import { useRouter } from "next/navigation";

function Header({ name, subName, onPress }: any) {
  const { useToken } = theme;
  const router = useRouter();
  const { token } = useToken();
  const { Text } = Typography;
  const { notification } = React.useContext(MainContext);

  const onRedirect = (item: any) => {
    router.push(`/notification/?id=${item.id}`);
  };

  const items = React.useMemo(
    () =>
      notification?.data
        ? notification.data.map((item: any, i: number) => ({
            label: (
              <>
                <Flex
                  style={{ minWidth: 300 }}
                  vertical
                  justify="space-between"
                  onClick={() => onRedirect(item)}
                >
                  <Text strong>{item.title}</Text>
                  <Text>{getFromNowShort(item.created_at)}</Text>
                </Flex>
                <Divider style={{ margin: 0 }} />
              </>
            ),
            key: i,
          }))
        : [],
    [notification]
  );
  useEffect(() => window.scrollTo(0, 0));

  const convertName = (name: string) => {
    switch (name) {
      case "history":
        return "lịch sử";
      case "news":
        return "tin tức";
      case "profile":
        return "thông tin cá nhân";
      case "notification":
        return "thông báo";
      default:
        return name;
    }
  };

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb
            items={[
              {
                title: <Link href="/">Trang chủ</Link>,
              },
              {
                title: convertName(name.replace("/", "")),
              },
            ]}
          ></Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {convertName(subName.replace("/", ""))}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Badge size="small" count={notification?.total_records || 0}>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              dropdownRender={(menu: any) => (
                <div style={contentStyle}>
                  {React.cloneElement(menu, {
                    style: {
                      boxShadow: "none",
                    },
                  })}
                  <Divider
                    style={{
                      margin: 0,
                    }}
                  />
                  <Flex
                    style={{
                      padding: 8,
                    }}
                  >
                    <Button
                      className="w-full"
                      type="primary"
                      onClick={() => router.push("/notification")}
                    >
                      Xem thêm
                    </Button>
                  </Flex>
                </div>
              )}
            >
              <a
                href="#"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {bell}
              </a>
            </Dropdown>
          </Badge>
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <Link href="/profile" className="btn-sign-in">
            {profile}
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default React.memo(Header);

const bell = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
      fill="#111827"
    ></path>
    <path
      d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
      fill="#111827"
    ></path>
  </svg>,
];

const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];
