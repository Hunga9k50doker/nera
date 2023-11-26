import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>404!</h2>
      <p>Không tìm thấy trang!</p>
      <Link href="/">Trang chủ</Link>
    </div>
  );
}
