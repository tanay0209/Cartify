'use client'
import Link from 'next/link'
import React from 'react'
import { BsCart2 } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
function Header() {
    const cart = useSelector((state: RootState) => state.cart)
    return (
        <div className='flex justify-between items-center sticky top-0 left-0 w-full bg-slate-700 text-white p-4'>
            <Link href='/'>
                <h1 className='text-2xl font-bold'>Cartify</h1>
            </Link>
            <Link href='/cart'>
                <button
                    className='text-lg relative flex items-center gap-2 rounded-sm'>
                    <BsCart2 size={30} />
                    {cart.length > 0 ? <span className='absolute top-0 -translate-y-1/2 translate-x-1/2 right-0 bg-black text-white rounded-full size-5 flex items-center justify-center'>{cart.length}</span> : ''}

                </button>
            </Link>
        </div >
    )
}

export default Header
