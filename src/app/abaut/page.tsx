"use client"
import { db } from '../../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

interface Data {
  key: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
}

const categories = [
  '4X-Large',
  'Small',
  'X-Small',
  'XX-Small',
  'Medium',
  'Large',
  'X-Large',
  'XX-Large',
  '3X-Large',
];

export default function Page() {
  const [getdata, setGetdata] = useState<Data[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchProducts = async (category: string | null = null, search: string | null = null) => {
    setLoading(true);
    const collectionRef = collection(db, 'products');
    let queryRef;

    if (category) {
      queryRef = query(collectionRef, where('category', '==', category));
    } else {
      queryRef = query(collectionRef);
    }

    const querySnapshot = await getDocs(queryRef);
    let datas = querySnapshot.docs.map((doc) => ({
      key: doc.id,
      ...doc.data(),
    })) as Data[];

    if (search) {
      datas = datas.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setGetdata(datas);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchProducts(category, searchTerm);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchTerm(search);
    fetchProducts(selectedCategory, search);
  };

  return (
    <>
      <div className="container mt-6">
        <p>
          <span className="hover:underline">
            <Link href="/">Home</Link>
          </span>{' '}
          {'>'}{' '}
          <span className="hover:underline cursor-pointer">Casual</span>{' '}
        </p>
      </div>
      <div className="flex flex-col   gap-8">
        <div className="mb-4 flex gap-4 justify-between w-full mt-12">
        <div className='flex flex-col'>
          <label htmlFor="inpt">Enter your products</label>
        <input
        id='inpt'
            type="text"
            className="px-8 py-2 border border-gray-300 bg-[#F0F0F0] hover:bg-none outline-none rounded-lg"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
          <div className='flex flex-col'>
            <label htmlFor="ctgry">Size</label>
            <select

              id='ctgry'
              className="p-2 border border-gray-300 rounded bg-[#F0F0F0] px-8  outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Products</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-12">
          <div className="flex flex-wrap justify-between gap-6">
            {loading ? (
              [...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-[12px] w-[290px] overflow-hidden h-[480px] bg-[#F0F0F0] text-left p-8"
                >
                  <Skeleton height={300} />
                  <div className="flex flex-col gap-[8px] mt-4">
                    <Skeleton width={295} height={25} />
                    <Skeleton width={150} height={30} />
                    <Skeleton width={250} height={20} />
                  </div>
                </div>
              ))
            ) : (
              getdata?.map((item: Data) => (
                <Link key={item.key} href={`/products/${item.key}`}>
                  <div
                    className="rounded-[12px] w-[290px] overflow-hidden h-[480px] bg-[#F0F0F0] text-left p-8"
                  >
                    <div className="flex flex-col gap-[8px]">
                      <img
                        src={item.images[0]}
                        alt="images"
                        width={295}
                        height={300}
                        className="h-[300px] rounded-lg object-cover"
                      />
                      <div className="flex justify-between px-[8px]">
                        <h3 className="font-medium text-[25px] ">${item.price}</h3>
                      </div>
                      <h1 className="text-2xl font-bold">{item.name}</h1>
                      <p className="text-2xl font-bold"> {item.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
