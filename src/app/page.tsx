import Getproducts from '@/components/Clothes';
import NewClothes from '@/components/newClothes';
import Link from 'next/link';
import { FC } from 'react';
import { FaStar } from 'react-icons/fa';

interface ClothesItem {
  id: number;
  name: string;
  price: string;
  dPrice?: string;
  image: string;
}

const clothes: ClothesItem[] = [
  { id: 1, name: 'T-SHIRT WITH TAPE DETAILS', price: '$120', image: '/new_1.png' },
  { id: 2, name: 'SKINNY FIT JEANS', price: '$240', dPrice: '$260', image: 'new_2.png' },
  { id: 3, name: 'CHECKERED SHIRT', price: '$180', image: 'new_3.png' },
  { id: 4, name: 'SLEEVE STRIPED T-SHIRT', price: '$130', dPrice: '$260', image: 'new_4.png' },
];

const clothesg: ClothesItem[] = [
  { id: 1, name: 'VERTICAL STRIPED SHIRT', price: '$212', dPrice: '$232', image: '/top_1.png' },
  { id: 2, name: 'COURAGE GRAPHIC T-SHIRT', price: '$145', image: 'top_2.png' },
  { id: 3, name: 'LOOSE FIT BERMUDA SHORTS', price: '$80', image: 'top_3.png' },
  { id: 4, name: 'FADED SKINNY JEANS', price: '$210', image: 'top_4.png' },
];

const page:FC = () => {
  return (
    <>
      <section className='mt-[1px]'>
        <img src='/Rectangle.png' alt='Banner' />
        <h1 className='text-[64px] font-bold relative top-[-550px] left-[20px]'>
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>
        <p className='relative top-[-550px] left-[20px]'>
          Browse through our diverse range of meticulously crafted garments, designed <br /> to
          bring out your individuality and cater to your sense of style.
        </p>
        <button className='w-[210px] h-[52px] rounded-[62px] bg-black text-white relative top-[-530px] left-[20px]'>
          Shop Now
        </button>
        <div className='flex items-center gap-4 relative top-[-500px] left-[20px]'>
          <div className='flex flex-col items-start border-r-2 pr-4'>
            <h4 className='font-bold text-[30px]'>200+</h4>
            <p>International Brands</p>
          </div>
          <div className='flex flex-col items-start'>
            <h4 className='font-bold text-[30px]'>2,000+</h4>
            <p>High-Quality Products</p>
          </div>
          <div className='flex flex-col items-start border-l-2 pl-4'>
            <h4 className='font-bold text-[30px]'>30,000+</h4>
            <p>Happy Customers</p>
          </div>
        </div>
      </section>
      <div className='h-[122px] bg-black flex items-center justify-evenly relative top-[-462px]'>
        <h4 className='text-white text-[40px]'>ZARI</h4>
        <h4 className='text-white text-[40px]'>GUCCI</h4>
        <h4 className='text-white text-[40px]'>PRADA</h4>
      </div>
      <div className='relative top-[-400px]'>
        <h1 className='text-center text-[40px] font-bold mb-8'>NEW ARRIVALS</h1>
        <div className='flex justify-between'>
          <NewClothes></NewClothes>
        </div>
        <div className='flex justify-center mt-12'>
          <Link href='/details' className='w-[218px] h-[52px] border-[1px] rounded-[62px] flex items-center justify-center mb-8 mx-auto'>
            View All
          </Link>
        </div>
      </div>
      {/* <div className='relative top-[-400px] border-t-[1px]'>
        <h1 className='text-center text-[40px] font-bold mb-8 uppercase mt-8'>top selling</h1>
        <div className='flex justify-between'>
        <Getproducts></Getproducts>
        </div>
        <div className='flex justify-center mt-12'>
          <Link href='/details' className='w-[218px] h-[52px] border-[1px] flex items-center justify-center rounded-[62px] mx-auto'>
            View All
          </Link>
        </div>
      </div> */}
     
    </>
  );
};

export default page;
