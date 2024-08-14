'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '@/features/cart/cartSlice';
import { Product } from '@/app/components/ProductCard';
import { RootState } from '../store';
import { toast } from 'sonner';

const AddToCartButton = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const cartItem = cart.find((item: { id: number }) => item.id === product.id);
    const initialCount = cartItem ? cartItem.quantity : 0;
    const [itemCount, setItemCount] = useState(initialCount);


    useEffect(() => {
        if (itemCount > 0) {
            dispatch(updateQuantity({ id: product.id, quantity: itemCount }));
        } else {
            dispatch(removeFromCart(product.id));
        }
    }, [itemCount, dispatch, product.id]);

    const handleAddToCart = () => {
        setItemCount(1);
        toast.success('Item added to cart');
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const handleIncrease = () => {
        setItemCount((prevCount: number) => prevCount + 1);
    };

    const handleDecrease = () => {
        setItemCount((prevCount: number) => (prevCount > 0 ? prevCount - 1 : 0));
        if (itemCount === 1) {
            toast.error('Item removed from cart');
        }
    };

    return (
        <div className='w-full text-black text-center rounded-sm'>
            {itemCount === 0 ? (
                <button
                    className='w-full cursor-pointer bg-white py-2 hover:bg-green-500 hover:text-white'
                    onClick={handleAddToCart}>Add to Cart</button>
            ) : (
                <div className='flex justify-between items-center text-xl'>
                    <button
                        className='bg-black text-white rounded-full cursor-pointer size-10 items-center justify-center flex'
                        onClick={handleDecrease}> - </button>
                    <span className='font-semibold text-black'>{itemCount}</span>
                    <button
                        className='bg-black text-white cursor-pointer rounded-full size-10 items-center justify-center flex'
                        onClick={handleIncrease}> + </button>
                </div>
            )}
        </div>
    );
};

export default AddToCartButton;

