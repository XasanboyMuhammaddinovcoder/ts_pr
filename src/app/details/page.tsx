import Counter from "@/components/counter";
import Link from "next/link";
import { FC, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { FaStar } from "react-icons/fa";

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

const page: FC = () => {
  // const [active , setActive] = useState<number>(1)
  return (
    <>
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
          <div className="flex flex-col gap-4">
            <img className="w-[200px] h-[220px]" src="/tshirt-1.png" alt="" />
            <img className="w-[200px] h-[220px]" src="/tshirt-2.png" alt="" />
            <img className="w-[200px] h-[220px]" src="/tshirt-3.png" alt="" />
          </div>
          <div>
            <img className="w-[600px]" src="/tshirt-1.png" alt="" />
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-[40px] font-bold">One Life Graphic T-shirt</h2>
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
              <p className="font-bold text-[32px]">$260</p>
              <p className="text-[32px]">$300</p>
            </div>
            <p className="my-6">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and <br />
              breathable fabric, it offers superior comfort and style.
            </p>
          </div>
          <div>
            Select Colors
            <div className="flex items-center gap-3 mt-4">
              <span className="w-6 h-6 flex items-center justify-center text-white bg-[#4F4631] rounded-full cursor-pointer">
                <GoChevronDown />
              </span>
              <span className="w-6 h-6 flex items-center justify-center text-white bg-[#314F4A] rounded-full cursor-pointer">
               
              </span>
              <span className="w-6 h-6 flex items-center justify-center text-white bg-[#31344F] rounded-full cursor-pointer">
               
              </span>
            </div>
          </div>
          <div className="border-t-[1px] pt-4 mt-5">
            Choose Size
            <div className="flex mt-4 gap-4">
              <span style={{ width: '104px', height: '46px' }} className="flex items-center bg-black text-white cursor-pointer rounded-[62px] justify-center">Small</span>
              <span style={{ width: '104px', height: '46px' }} className="flex items-center justify-center  bg-[#F0F0F0] cursor-pointer rounded-[62px] justify-center">Medium</span>
              <span style={{ width: '104px', height: '46px' }} className="flex items-center justify-center  bg-[#F0F0F0] cursor-pointer rounded-[62px] justify-center">Large</span>
              <span style={{ width: '104px', height: '46px' }} className="flex items-center justify-center bg-[#F0F0F0] cursor-pointer rounded-[62px] justify-center ">X-Large</span>
            </div>
          </div>
          <div className="pt-4 mt-5 flex items-center justify-between gap-8 border-t-[1px]">
            <div className="flex items-center gap-8 rounded-[62px] px-8 py-1 bg-[#F0F0F0]">
              <span className="cursor-pointer text-[40px]"> - </span>
              <p className="text-[25px]"> 1  </p>
              <span className="cursor-pointer text-[40px]"> + </span>
            </div>
            {/* <Counter></Counter> */}
            <div>
              <button className="w-[400px] h-[52px] rounded-[62px] bg-black text-white">Add to Cart</button>
            </div>
          </div>
          <div>

          </div>
        </div>
      </section>
      <div>
        <h1 className="text-center text-[40px] font-bold mb-8">NEW ARRIVALS</h1>
        <div className="flex justify-between">
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
        </div>
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
};

export default page;
