'use client'

import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

type Data = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    category: string;
    gender: string;
    color: string;
}

export default function GetProducts() {
    const [getdata, setGetdata] = useState<Data[]>([]);
    
    useEffect(() => {
        const getDatas = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "topProducts"));
                const datas = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Data[];
                setGetdata(datas);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        getDatas();
    }, []);
    
    useEffect(() => {
        console.log(getdata);
    }, [getdata]);

    return (
        <>
        <div className="flex flex-wrap justify-between gap-6">
        {getdata.map((item, index) => (
                <div key={item?.id} className="rounded-[12px] w-[290px] overflow-hidden h-[530px] bg-[#F0F0F0] text-center">
                    <Link href={'/details'}>
                        <div className="flex flex-col gap-[8px]">
                           {
                            item?.imgUrl ? (
                                <img
                                src={item?.imgUrl}
                                alt="images"
                                width={295}
                                height={300}
                            />
                            ):(
                                <img src="/new_2.png" alt="" />
                            )
                           }
                            <div className="flex justify-between px-[8px]">
                                <h3 className="font-medium text-[16px]">${item?.price}</h3>
                            </div>
                            <h1>{item?.name}</h1>
                            <p>{item?.category}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
        </>
    );
}
