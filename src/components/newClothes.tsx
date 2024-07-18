'use client'

import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type data = {
    name: string,
    price: number,
    images: [
        string
    ],
    description: string,
    category: string,
    gender: string,
    color: string,
    key: string,
}

export default function NewClothes() {
    const [getdata, setGetdata] = useState<data[] | undefined>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDatas = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const datas = querySnapshot.docs.map((doc) => ({
                key: doc.id,
                ...doc.data()
            })) as data[];
            setGetdata(datas);
            setLoading(false);
        }
        getDatas();
    }, []);

    return (
        <>
            <div className="flex flex-wrap justify-between gap-6">
                {loading ? (
                    [...Array(8)].map((_, index) => (
                        <div key={index} className="rounded-[12px] w-[290px] overflow-hidden h-[480px] bg-[#F0F0F0] text-left p-8">
                            <Skeleton height={300} />
                            <div className="flex flex-col gap-[8px] mt-4">
                                <Skeleton width={295} height={25} />
                                <Skeleton width={150} height={30} />
                                <Skeleton width={250} height={20} />
                            </div>
                        </div>
                    ))
                ) : getdata?.map((item: data) => (
                    <Link key={item.key} href={`/products/${item.key}`}>
                        <div className="rounded-[12px] w-[290px] overflow-hidden h-[480px] bg-[#F0F0F0] text-left p-8">
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
                ))}
            </div>
        </>
    )
}
