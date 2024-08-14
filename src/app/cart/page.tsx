'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { toast } from 'sonner';
import { clearCart } from '../../features/cart/cartSlice';
import { useRouter } from 'next/navigation';
function Page() {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='mx-auto max-w-md sm:max-w-xl lg:max-w-4xl'>
            <h1 className='text-2xl font-bold my-4'>My Cart</h1>
            {cart.length > 0 ? <><div className='flex flex-col gap-4'>
                {cart.map((item) => (
                    <CartItem key={item.id} product={item} />
                ))}
            </div>
                <div className='flex justify-end flex-col my-4 border-t gap-2 border-gray-400 py-4'>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-lg'>Subtotal:</p>
                        <p className='font-semibold text-lg'>Rs {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-lg'>Discount:</p>
                        <p className='font-semibold text-lg'>- Rs 0</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-lg'>Total:</p>
                        <p className='font-semibold text-lg'>Rs {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                    </div>
                    <button
                        onClick={() => {
                            toast.success('Checkout successful')
                            dispatch(clearCart())
                            router.push('/')
                        }}
                        className='bg-green-500 hover:bg-green-600 text-white px-4 w-full py-2 rounded-sm'>Checkout</button>
                </div> </> : <p>Oops! Looks like your cart is empty, let's add some items to it <span className='text-blue-500 font-bold underline'><Link href="/">Shop Now</Link></span></p>}
        </div>
    );
}

export default Page;
