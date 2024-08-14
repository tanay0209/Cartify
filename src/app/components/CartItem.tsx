'use client'
import React from 'react'
import AddToCartButton from './AddToCartButton'
import Image from 'next/image'
import { Product } from './ProductCard'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '@/features/cart/cartSlice';
import { toast } from 'sonner';
function CartItem({ product }: { product: Product }) {
    const dispatch = useDispatch()
    function handleRemoveFromCart() {
        dispatch(removeFromCart(product.id))
        toast.success('Item removed from cart')
    }
    return (
        <div
            className={`flex text-black h-full items-center w-full p-4 hover:shadow-md justify-between gap-2 shadow-sm border-2`}>
            <div className='w-1/3 h-40 overflow-hidden flex items-center justify-center'>
                <Image
                    loading='lazy'
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    className='object-cover object-center w-full h-full'
                />
            </div>
            <div className='flex flex-col items-start w-2/3 h-full gap-4'>
                <div className='flex items-center justify-between w-full'>
                    <h3 className='font-semibold'>{product.name}</h3>
                    <button onClick={handleRemoveFromCart} className='text-red-500 cursor-pointer font-bold'>Remove</button>
                </div>
                <p className='text-sm'>{product.description}</p>
                <p className='font-semibold'>Rs. {product.price}</p>
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}

export default CartItem
