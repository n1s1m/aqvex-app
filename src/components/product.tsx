import { Check, X, Droplet, ShoppingCart } from "lucide-react";
import { Rating } from 'react-simple-star-rating'

import type { Product as ProductType } from "@/shared/types/types";
import { Card, CardHeader, CardTitle, CardContent, Image, CardFooter, Button, CardDescription, DiscountBadge, SelectItem, SelectValue, SelectContent, SelectTrigger, Select } from "@/shared/ui";


export function Product({ product }: { product: ProductType }) {
    const hasDiscount = product.old_price && product.discount_percent > 0;

    return (
        <Card className="flex flex-col justify-between shadow-none max-w-[347px] w-full gap-0 flex-1 max-sm:max-w-full max-sm:px-4 rounded-none overflow-visible">
            <CardHeader className="p-0 border-0 border-b-0 bg-transparent gap-0">
                <div className="relative w-full rounded-md overflow-hidden">
                    <Image src={product.image} alt={product.name} className="w-full h-full object-contain product-image" />
                </div>
                <CardTitle className="flex items-baseline gap-2 pt-4.5">
                    {product.old_price && <span className="line-through decoration-red-500 text-secondary text-[22px]">{product.old_price}</span>}
                    <span className="text-gradient-main">{product.price} {product.currency}</span>
                    {hasDiscount && <DiscountBadge value={product.discount_percent} />}
                </CardTitle>
                <CardDescription className="pt-8">
                    <span className="text-primary text-lg">{product.name}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 border-0 border-b-0 bg-transparent pt-4">
                <div className="flex items-center gap-2 flex-row">
                    <Rating
                        initialValue={product.rating}
                        iconsCount={5}
                        size={14}
                        allowFraction={true}
                        fillColor="#43A0FD"
                        emptyColor="#E6E9ED"
                        readonly={true}
                    />
                    <span className="text-primary text-sm underline decoration-secondary-foreground underline-offset-4 pt-1"> {product.reviews_count}</span>
                </div>
                <div className="flex items-center gap-2 flex-row pt-8">
                    <p className="text-primary text-sm flex items-center gap-2 flex-row">
                        {product.in_stock ? <Check className="w-5 h-5 text-white bg-green-500 rounded-full p-0.5" strokeWidth={3} /> : <X className="w-5 h-5 text-white bg-red-500 rounded-full p-0.5" strokeWidth={3} />}
                        <span className="text-primary text-sm font-normal">
                            {product.in_stock ? "В наличии" : "Нет в наличии"}
                        </span>
                        <Droplet className="w-4 h-4 text-secondary-foreground" />
                        <span className="text-secondary text-sm font-normal">{product.category}</span>
                    </p>
                </div>
            </CardContent>
            <CardFooter className="p-0 bordr-0 border-t-0 bg-transparent pt-8 flex flex-row gap-2">
                {product.volumes?.length > 0 && (
                    <Select value={product.selected_volume_id}>
                        <SelectTrigger size="lg" className="px-5 py-4 text-lg rounded-lg border-grey-100">
                            <SelectValue placeholder="Выберите объем" />
                        </SelectTrigger>
                        <SelectContent>
                            {product.volumes.map((volume) => (
                                <SelectItem key={volume.id} value={volume.id}>
                                    {volume.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                <Button variant="accent" size="lg" className="flex-1 gap-3 flex items-center justify-center">
                    <ShoppingCart className="size-6.5" />
                    <span className="text-primary text-lg font-normal">В корзину</span>
                </Button>
            </CardFooter>
        </Card>
    );
}