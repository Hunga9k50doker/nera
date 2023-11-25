export const ERRORS = [
  "Network Error",
  "Request failed with status code 500",
  "Request failed with status code 404",
  "Internal Server Error",
];

export const contentError = (error: string) => {
  switch (error) {
    case "Network Error":
      return "Không thể kết nối đến máy chủ, vui lòng thử lại sau!";
    case "Request failed with status code 500":
      return "Lỗi yêu cầu hệ thống, vui lòng thử lại sau!";
    case "Request failed with status code 404":
      return "Yêu cầu không tồn tại hoặc lỗi hệ thống!";
    case "Internal Server Error":
      return "Lỗi hệ thống!";
    default:
      return error;
  }
};
