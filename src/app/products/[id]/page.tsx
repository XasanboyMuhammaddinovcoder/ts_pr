"use client";

import Counter from "@/components/counter";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { Button, message, Space } from 'antd';
import { GoChevronDown } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import TextCheckboxList from "@/components/Text";
import Colors from "@/components/Colors";
import ImageSelector from "@/components/img";
import { db } from "../../../../firebase/config";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import NewClothes from "@/components/newClothes";

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
  { id: 4, name: 'Black Striped T-shirt', dPrice: '$120', price: '$150', image: 'might_4.png' },
];

export default function Page({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<DocumentData | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "products", `${params.id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProductData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const success = () => {
    const cartItem = {
      name: productData?.name,
      price: productData?.price,
      description: productData?.description,
      colors: ['white', 'black', 'lightgrey'],
      size: ['X-Large', '4X-Large', 'XX-Small'],
      images: productData?.images
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  return (
    <>
      {contextHolder}
      <div className="container mt-6">
        <p>
          <span className="hover:underline">
            <Link href="/">Home</Link>
          </span>{" "}
          {'>'}{" "}
          <span className="hover:underline cursor-pointer">Shop</span>{" "}
          {'>'}{" "}
          <span className="hover:underline cursor-pointer">Men</span>{" "}
          {'>'}{" "}
          <span className="hover:underline cursor-pointer">T-shirts</span>
        </p>
      </div>
      <section className="flex items-center justify-between gap-8"> 
        <div className="flex mt-12 gap-4">
          <ImageSelector images={productData?.images}/>
        </div>
        <div>
          <div>
            <h2 className="text-[40px] font-bold">{productData?.name}</h2>
            <div className="flex items-center gap-2 my-2">
              <span className="text-[#FFC633]">
                <FaStar />
              </span>
              <span className="text-[#FFC633]">
                <FaStar />
              </span>
              <span className="text-[#FFC633]">
                <FaStar />
              </span>
              <span className="text-[#FFC633]">
                <FaStar />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-[32px]">${productData?.price}</p>
              <p className="text-[32px]">$300</p>
            </div>
            <p className="my-6">
             {productData?.description}
            </p>
          </div>
          <div>
            Select Colors
            <Colors />
          </div>
          <div className="border-t-[1px] pt-4 mt-5">
            Choose Size
            <TextCheckboxList />
          </div>
          <div className="pt-4 mt-5 flex items-center justify-between gap-8 border-t-[1px]">
            <Counter />
            <div>
              <Space>
                <button onClick={success} className="w-[400px] h-[52px] rounded-[62px] bg-black text-white">Add to Cart</button>
              </Space>
            </div>
          </div>
          <div>
          </div>
        </div>
      </section>
      <div>
        <h1 className="text-center text-[40px] font-bold mt-20 my-8">NEW ARRIVALS</h1>
        {/* <div className="flex justify-between">
          {clothes.map((el) => (
            <Link href="/details" key={el.id}>
              <img className="rounded-lg" src={el.image} alt={el.name} />
              <h4 className="font-bold text-xl mt-2">{el.name}</h4>
              <div className="flex items-center gap-2 my-2">
                <span className="text-[#FFC633]">
                  <FaStar />
                </span>
                <span className="text-[#FFC633]">
                  <FaStar />
                </span>
                <span className="text-[#FFC633]">
                  <FaStar />
                </span>
                <span className="text-[#FFC633]">
                  <FaStar />
                </span>
              </div>
              <div className="flex items-center gap-4">
                <h4 className="font-bold">{el.price}</h4>
                {el.dPrice && <h4 className="line-through">{el.dPrice}</h4>}
              </div>
            </Link>
          ))}
        </div> */}
        <NewClothes></NewClothes>
        <div className="flex justify-center mt-12">
          <Link
            href="/details"
            className="w-[218px] h-[52px] border-[1px] rounded-[62px] flex items-center justify-center mb-8 mx-auto"
          >
            View All
          </Link>
        </div>
      </div>
    </>
  );
}
