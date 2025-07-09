import type { Brand, MembershipGrade } from "../types"

export const BRANDS: Brand[] = [
  { id: "cgv", name: "CGV", color: "#E53E3E", bgColor: "bg-red-500", textColor: "text-white" },
  { id: "baskin", name: "베스킨라빈스", color: "#ED64A6", bgColor: "bg-pink-500", textColor: "text-white" },
  { id: "paris", name: "파리바게트", color: "#F56500", bgColor: "bg-orange-500", textColor: "text-white" },
  { id: "gs25", name: "GS25", color: "#3182CE", bgColor: "bg-blue-500", textColor: "text-white" },
  { id: "lotte", name: "롯데월드", color: "#E53E3E", bgColor: "bg-red-600", textColor: "text-white" },
  { id: "hollys", name: "할리스", color: "#8B4513", bgColor: "bg-amber-800", textColor: "text-white" },
]

export const MEMBERSHIP_GRADES: MembershipGrade[] = [
  { value: "vvip", label: "VVIP" },
  { value: "vip", label: "VIP" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "bronze", label: "Bronze" },
]

export const ANIMATIONS = {
  slideVariants: {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0 }),
  },
  transition: {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  },
  button: { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } },
}
