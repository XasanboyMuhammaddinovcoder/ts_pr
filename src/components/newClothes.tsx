'use client'

import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type data = {
    name: string,
    price: number,
    images: [
        string
    ],
    description: string,
    category: string,
    gender:string,
    color: string,
    key: string,
}

export default function  NewClothes() {
    const [getdata, setGetdata] = useState<[] | undefined>([]);
    useEffect(() => {
        const getDatas = ()=>{
            const querySnapshot = getDocs(collection(db, "products"))
            .then((querySnapshot) => {
                const datas = querySnapshot.docs.map((doc) => ({
                    key: doc.id,
                    ...doc.data()
                }))
                setGetdata(datas as []);
            })
        }
        getDatas()
        
    }, [])
        
    return (
        <>
          <div className="flex flex-wrap justify-between gap-6">
          {getdata?.map((item : data) => (
                <Link href={`/products/${item.key}`}>
                <div key={item.key} className="rounded-[12px] w-[290px] overflow-hidden h-[480px] bg-[#F0F0F0] text-left p-8">
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