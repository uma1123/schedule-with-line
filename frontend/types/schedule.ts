export interface Schedule {
  id: number;
  lineUserId: string;
  title: string;
  dateTime: string;
  category: "プライベート" | "バイト" | "学校" | "就活" | "その他";
  createdAt: string;
  updatedAt: string;
}

export const CATEGORIES = [
  "プライベート",
  "バイト",
  "学校",
  "就活",
  "その他",
] as const;

export const CATEGORY_COLORS = {
  プライベート: "bg-blue-100 text-blue-800 border-blue-200",
  バイト: "bg-orange-100 text-orange-800 border-orange-200",
  学校: "bg-green-100 text-green-800 border-green-200",
  就活: "bg-red-100 text-red-800 border-red-200",
  その他: "bg-gray-100 text-gray-800 border-gray-200",
} as const;
