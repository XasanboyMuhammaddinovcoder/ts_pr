"use client";

import Counter from "@/components/counter";
import Link from "next/link";
import {  useState, useEffect } from "react";
import {  message, Space } from 'antd';

import { FaStar } from "react-icons/fa";

import ImageSelector from "@/components/img";
import { db } from "../../../../firebase/config";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import NewClothes from "@/components/newClothes";
import ColorONE from "@/components/ColorOne";
import CotegoryCheck from "@/components/cotegory";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ClothesItem {
  id: number;
  name: string;
  price: string;
  dPrice?: string;
  image: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const success = async () => {
    const cartItem = {
      name: productData?.name,
      price: productData?.price,
      description: productData?.description,
      colors: productData?.color,
      size: productData?.category,
      images: productData?.images,
      category: productData?.category
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Save to Firebase
    try {
      await setDoc(doc(db, "cart", params.id), cartItem);
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
          {loading ? (
            <Skeleton height={300} width={300} />
          ) : (
            <ImageSelector images={productData?.images}/>
          )}
        </div>
        <div>
          <div>
            {loading ? (
              <>
                <Skeleton height={40} width={300} />
                <Skeleton height={20} width={150} count={4} />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <div>
            <h1 className="font-bold text-2xl mb-4">Select Colors</h1>
            {loading ? (
              <Skeleton height={30} width={100} count={3} />
            ) : (
              <ColorONE color={productData?.color}/>
            )}
          </div>
          <div className="border-t-[1px] pt-4 mt-5">
            <h1 className="font-bold text-2xl mb-4">Choose Size</h1> 
            {loading ? (
              <Skeleton height={30} width={100} count={3} />
            ) : (
              <CotegoryCheck category={productData?.category}/>
            )}
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
        <NewClothes />
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
