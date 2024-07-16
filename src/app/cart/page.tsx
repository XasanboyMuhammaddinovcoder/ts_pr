"use client"

import Counter from '@/components/counter';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { db } from '../../../firebase/config';
import CartpageC from '@/components/CartpageC';



interface ClothesItem {
    id: number;
    name: string;
    price: string;
    dPrice?: string;
    image: string;
}

const clothes: ClothesItem[] = [
    { id: 1, name: 'Polo with Contrast Trims', price: '$212', dPrice: '$242', image: '/might_1.png' },
    { id: 2, name: 'Gradient Graphic T-shirt', price: '$145', image: 'might_2.png' },
    { id: 3, name: 'Polo with Tipping Details', price: '$180', image: 'might_3.png' },
];


export default function page() {
    const [data , setData] = useState<object[]>([])
    useEffect(() => {
        const docref = doc(db , "cart" , "8WykdtxijtX6XFbVpnvsStlU8QU2" );
        getDoc(docref).then((docSnap) => {
            if (docSnap.exists()) {
                console.log("Document data: " , docSnap.data());
                setData((prev) => [...prev, {id: docSnap.id, ...docSnap.data() }]);
            } else {
                console.log("No such Document");
            }
        
        })
    } , [])
    return (
        <>
            <div>
                <div className="container mt-6">
                    <p>
                        <span className="hover:underline">
                            <Link href="/">Home</Link>
                        </span>{" "}
                        {'>'}{" "}
                        <span className="hover:underline cursor-pointer">Cart</span>
                    </p>
                </div>
            </div>
            <div>
                <h2 className='uppercase text-[42px] font-bold'>Your cart</h2>
                <div className='flex w-full justify-between'>
                    <CartpageC></CartpageC>
                    <div className='border rounded-[20px] p-12 mb-12'>
                        <h2 className='font-bold text-[22px] mb-4
                        '>Order Summary</h2>
                        <div className='flex items-center w-96 justify-between'>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-[#000000]'>Subtotal</h2>
                                <h2 className='text-[#000000]'>Discount (-20%)</h2>
                                <h2 className='text-[#000000]'>Delivery Fee</h2>
                                <h2 className='text-[#000000]'>Total</h2>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-bold'>$565</h2>
                                <h2 className='font-bold text-[#FF3333]'>-$113</h2>
                                <h2 className='font-bold'>$15</h2>
                                <h2 className='font-bold'>$467</h2>
                            </div>
                        </div>
                        <div className='flex justify-end mt-8'>
                            <button className='rounded-[42px] text-white bg-black h-12 w-20 flex justify-center items-center'>Apply</button>
                        </div>
                        <div className='flex justify-end mt-8'>
                            <button className='rounded-[42px] text-white bg-black h-16 w-96 flex justify-center items-center'>Go to Checkout -{'>'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
