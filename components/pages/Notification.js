"use client";
import React from "react";
import { MainContext } from "@/context/MainContext";
import { Row, Col, Card, List, Space, Pagination } from "antd";
import dayjs from "dayjs";
import ReactHtmlParser from "react-html-parser";
import { getNotificationDetailAction, getNotificationAction } from "@/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Notification = ({ data, shortView = false, intialNew = null }) => {
  const { updateNotification } = React.useContext(MainContext);
  const router = useRouter();
  const [pageData, setPageData] = React.useState(data?.data);
  const [newDetail, setNewDetail] = React.useState(intialNew?.data);
  const [itemSelected, setItemSelected] = React.useState(intialNew?.data);

  const getNotification = React.useCallback(
    async (page) => {
      const data = await getNotificationAction({
        page: page,
      });
      if (data.status < 300) {
        return setPageData(data.data);
      } else {
        return toast(data?.message, {
          type: data?.type,
        });
      }
    },
    [pageData]
  );

  const getNotificationDetail = React.useCallback(async () => {
    const data = await getNotificationDetailAction(itemSelected?.id);
    if (data.status < 300) {
      return setNewDetail(data.data);
    } else {
      return toast(data?.message, {
        type: data?.type,
      });
    }
  }, [itemSelected]);

  const onChange = React.useCallback((e) => {
    getNotification(e);
  }, []);

  React.useEffect(() => {
    if (itemSelected) getNotificationDetail();
  }, [itemSelected]);

  React.useEffect(() => {
    if (data?.data) updateNotification(data.data);
  }, [data]);

  if (shortView) {
    return null;
  }

  return (
    <Row gutter={[24, 0]}>
      <Col span={24} md={16} className="mb-24">
        <Card
          className="header-solid h-full"
          bordered={false}
          title={[
            <Space key={0} direction="vertical">
              <h6 className="font-semibold m-0">{newDetail.title}</h6>
              <p className=" m-0">
                {dayjs(new Date(newDetail.created_at)).format(
                  "DD/MM/YYYY hh:mm A"
                )}
              </p>
            </Space>,
          ]}
          bodyStyle={{ paddingTop: "0" }}
        >
          <Row gutter={[24, 24]}>
            {newDetail && (
              <Col span={24}>
                <Card className="card-billing-info" bordered="false">
                  <div className="col-info">
                    {ReactHtmlParser(newDetail.body)}
                  </div>
                </Card>
              </Col>
            )}
          </Row>
        </Card>
      </Col>
      <Col span={24} md={8} className="mb-24">
        <Card
          bordered={false}
          bodyStyle={{ padding: 0 }}
          className="header-solid h-full  ant-list-yes"
          title={<h6 className="font-semibold m-0">Danh sách thông báo</h6>}
        >
          {pageData && (
            <List
              className="transactions-list ant-newest"
              itemLayout="horizontal"
              dataSource={pageData.data}
              renderItem={(item) => (
                <List.Item
                  className="cursor-pointer"
                  style={{
                    padding: "8px 16px",
                    borderLeft:
                      itemSelected && item?.id === itemSelected?.id
                        ? "4px solid #52c41a"
                        : "none",
                  }}
                  onClick={() => {
                    setItemSelected(item);
                    router.push(`/notification/?id=${item.id}`);
                  }}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={dayjs(new Date(item.created_at)).format(
                      "DD/MM/YYYY hh:mm A"
                    )}
                  />
                  <div className="amount">
                    <span className={item.amountcolor}>{item.amount}</span>
                  </div>
                </List.Item>
              )}
            />
          )}
          {pageData?.total_page > 1 && (
            <Pagination
              style={{
                padding: 16,
              }}
              defaultCurrent={1}
              total={pageData?.total_records}
              showSizeChanger={false}
              onChange={onChange}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Notification;
