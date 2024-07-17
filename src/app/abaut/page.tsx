import Colors from '@/components/Colors';
import Filter from '@/components/Filter';
import NewClothes from '@/components/newClothes';
import TextCheckboxList from '@/components/Text';
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa';

interface ClothesItem {
  id: number;
  name: string;
  price: string;
  dPrice?: string;
  image: string;
}

const clothesg: ClothesItem[] = [
  { id: 1, name: 'VERTICAL STRIPED SHIRT', price: '$212', dPrice: '$232', image: '/top_1.png' },
  { id: 2, name: 'COURAGE GRAPHIC T-SHIRT', price: '$145', image: 'top_2.png' },
  { id: 3, name: 'LOOSE FIT BERMUDA SHORTS', price: '$80', image: 'top_3.png' },
];


export default function page() {
  return (
    <>
      <div className="container mt-6">
        <p>
          <span className="hover:underline">
            <Link href="/">Home</Link>
          </span>{" "}
          {'>'}{" "}
          <span className="hover:underline cursor-pointer">Casual</span>{" "}

        </p>
      </div>
      <div className='flex gap-8'>
        <div className='w-[700px]'>
            <Filter/>
            <Colors/>
            <TextCheckboxList/>
            <button className='w-full bg-white text-black hover:bg-black transition duration-100 border-[4px] hover:text-white my-4 h-14 text-1xl rounded-3xl'>Save</button>
        </div>
        <div className='mb-12'>
          <NewClothes></NewClothes>
        </div>
      </div>
    </>
  )
}
