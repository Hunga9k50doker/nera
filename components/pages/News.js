"use client";
import { Row, Col, Card, List, Pagination } from "antd";
import React from "react";
import dayjs from "dayjs";
import ReactHtmlParser from "react-html-parser";
import { getNewDetailAction, getNewsAction } from "@/actions";
import { toast } from "react-toastify";
function News({ data: news, intialNew }) {
  const [pageData, setPageData] = React.useState(news?.data);
  const [newDetail, setNewDetail] = React.useState(intialNew?.data);
  const [itemSelected, setItemSelected] = React.useState(intialNew?.data);

  const getNews = React.useCallback(
    async (page) => {
      const data = await getNewsAction({
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

  const onChange = React.useCallback((e) => {
    getNews(e);
  }, []);

  const getNewDetail = React.useCallback(async () => {
    const data = await getNewDetailAction(itemSelected?.id);
    if (data.status < 300) {
      return setNewDetail(data.data);
    } else {
      return toast(data?.message, {
        type: data?.type,
      });
    }
  }, [itemSelected]);

  React.useEffect(() => {
    if (itemSelected) getNewDetail();
  }, [itemSelected]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[
              <h6 key={0} className="font-semibold m-0">
                {newDetail.title}
              </h6>,
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
            title={<h6 className="font-semibold m-0">Tin tức mới nhất </h6>}
          >
            {pageData && (
              <List
                className="transactions-list ant-newest"
                itemLayout="horizontal"
                dataSource={pageData.data}
                renderItem={(item) => (
                  <List.Item
                    className="cursor-pointer"
                    onClick={() => setItemSelected(item)}
                    style={{
                      padding: "8px 16px",
                      borderLeft:
                        itemSelected && item?.id === itemSelected?.id
                          ? "4px solid #52c41a"
                          : "none",
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
          </Card>
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
        </Col>
      </Row>
    </>
  );
}

export default React.memo(News);
