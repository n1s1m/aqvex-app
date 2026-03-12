import { Image } from "./image"


type DiscountBadgeProps = {
  value: number
}

export function DiscountBadge({ value }: DiscountBadgeProps) {
  if (!value || value <= 0) return null

  return (
    <div className="inline-flex items-center text-white font-semibold text-md leading-none">
      <Image src="/badge-icon.svg" alt="Discount" width={10} height={20} className="h-full" />
      <span className="leading-none text-md  bg-destructive px-1 py-[2px] rounded-r-xs">{value}%</span>
    </div>
  )
}

