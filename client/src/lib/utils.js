import { clsx } from "clsx";
//  Một thư viện giúp xử lý chuỗi class trong React một cách linh hoạt.
//  Nó cho phép truyền vào nhiều class dưới dạng điều kiện mà không cần dùng toán tử && hoặc ternary (? :).
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
