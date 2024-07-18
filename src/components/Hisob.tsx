import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

interface ClothesItem {
    id: string;
    name: string;
    price: string;
    dPrice?: string;
    image: string;
    colors: string;
    size: string;
    images: string;
    category: string;
}

export default function Hisob() {
    const [cartItems, setCartItems] = useState<ClothesItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);  // State for total price

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "cart"));
                const items: ClothesItem[] = [];
                let total = 0;
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Omit<ClothesItem, "id">;
                    const item: ClothesItem = {
                        id: doc.id,
                        name: data.name,
                        price: data.price,
                        dPrice: data.dPrice,
                        image: data.image,
                        colors: data.colors,
                        size: data.size,
                        images: data.images,
                        category: data.category,
                    };
                    items.push(item);
                    total += parseFloat(data.price);  // Calculate total price
                });
                setCartItems(items);
                setTotalPrice(total);  // Set total price
            } catch (error) {
                console.error("Error fetching cart items: ", error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <>
            {
                cartItems.length > 0 ? (
                    <div className='border rounded-[20px] p-12 mb-12'>
                        <h2 className='font-bold text-[22px] mb-4'>Order Summary</h2>
                        <div className='flex items-center w-96 justify-between'>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-[#000000]'>Total</h2>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-bold'>${totalPrice.toFixed(2)}</h2>  {/* Display total price */}
                            </div>
                        </div>
                        <div className='flex justify-end mt-8'>
                            <button className='rounded-[42px] text-white bg-black h-16 w-96 flex justify-center items-center'>
                                Go to Checkout -{'>'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}
