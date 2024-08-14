'use client'
import Image from 'next/image';
import React from 'react'
import AddToCartButton from './AddToCartButton'

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

function ProductCard({ product }: { product: Product }) {
    return (
        <div
            className={`flex flex-col text-black h-full items-center w-full p-4 justify-between gap-3 bg-blue-400 rounded-md`}>
            <div className='w-full h-40 overflow-hidden flex items-center justify-center'>
                <Image
                    loading='lazy'
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className='object-cover object-center w-full h-full'
                />
            </div>
            <div className='flex flex-col items-start gap-1 w-full'>
                <h3 className='font-semibold'>{product.name}</h3>
                <p className='text-sm'>{product.description}</p>
                <p className='font-semibold'>Rs. {product.price}</p>
            </div>
            <AddToCartButton product={product} />
        </div>
    )
}

export default ProductCard
