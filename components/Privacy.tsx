import React from "react";
import { Collapse, Space, Typography } from "antd";
import { getPrivacyAction, getPrivacyDetailAction } from "@/actions";
import { toast } from "react-toastify";
import { useModalContext } from "@/context/ModalContext";
import ModalInfo from "@/components/modal/ModalInfo";
import ReactHtmlParser from "react-html-parser";
import Loading from "@/components/Loading";

const Privacy = () => {
  const { Text } = Typography;
  const modalId = "modal-info";
  const { showModal } = useModalContext();
  const [isLoadingDetail, setIsLoadingDetail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState<any>();
  const [itemDetail, setItemDetail] = React.useState<any>();
  const [pageData, setPageData] = React.useState({
    data: [],
    total_records: 0,
    page_index: 0,
    total_page: 0,
  });

  const getPrivacy = React.useCallback(async () => {
    setIsLoading(true);
    const data = await getPrivacyAction({
      page: pageData.page_index + 1,
      page_size: 10,
    });
    if (data.status >= 300) {
      toast(data?.message, {
        type: data?.type,
      });
    } else {
      setPageData(data.data);
    }
    setIsLoading(false);
  }, [pageData]);

  const getPrivacyDetail = React.useCallback(async () => {
    setIsLoadingDetail(true);
    const data = await getPrivacyDetailAction(itemSelected?.id);
    if (data.status >= 300) {
      toast(data?.message, {
        type: data?.type,
      });
    } else {
      setItemDetail(data.data);
    }
    setIsLoadingDetail(false);
  }, [itemSelected]);

  const onViewDetail = (item: any) => {
    setItemSelected(item);
    showModal(modalId);
  };

  React.useEffect(() => {
    getPrivacy();
  }, []);

  React.useEffect(() => {
    if (itemSelected) getPrivacyDetail();
  }, [itemSelected]);

  const items = React.useMemo(
    () =>
      pageData.data.map((item: any, key: number) => ({
        key: key,
        label: item.title,
        children: (
          <Space direction="vertical">
            {item.description}
            <Text
              onClick={() => onViewDetail(item)}
              type="success"
              className="cursor-pointer"
            >
              Xem chi tiết
            </Text>
          </Space>
        ),
      })),
    [pageData]
  );

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && Boolean(pageData.data.length) && (
        <Collapse items={items} />
      )}
      {!isLoading && !Boolean(pageData.data.length) && "Lỗi hiện thị dữ liệu"}
      <ModalInfo
        modalId={modalId}
        title={!isLoadingDetail ? itemDetail?.title : "Chi tiết"}
      >
        {isLoadingDetail && <Loading />}
        {!isLoadingDetail && itemDetail && ReactHtmlParser(itemDetail.body)}
        {!isLoadingDetail && !itemDetail && "Lỗi hiện thị dữ liệu"}
      </ModalInfo>
    </>
  );
};

export default Privacy;
