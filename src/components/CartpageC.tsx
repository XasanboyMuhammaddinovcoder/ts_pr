import { FaRegTrashCan } from "react-icons/fa6";
import Counter from "./counter";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ClothesItem {
    id: number;
    name: string;
    price: string;
    dPrice?: string;
    image: string;
    colors: string[];
    size: string[];
}

export default function CartpageC() {
    const [cartItems, setCartItems] = useState<ClothesItem[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<Partial<ClothesItem>>({});

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(storedCartItems);
    }, []);

    const deleteItem = (index: number) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditedItem(cartItems[index]);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem(prevState => ({ ...prevState, [name]: value }));
    };

    const saveEdit = (index: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index] = { ...updatedCartItems[index], ...editedItem } as ClothesItem;
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setEditingIndex(null);
        setEditedItem({});
    };

    return (
        <>
       {
        cartItems.length > 0 &&  cartItems ? (
            <div className='flex flex-col border rounded-[20px] p-12 gap-8 mb-12'>
            {cartItems && cartItems.map((el, index) => (
                <div key={index} className='flex gap-6'>
                    <div>
                        <img className='w-60' src={'/tshirt-1.png'} alt={el.name} />
                    </div>
                    <div className='flex gap-8 p-4'>
                        <div>
                            {editingIndex === index ? (
                                <>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editedItem.name || ''} 
                                        onChange={handleEditChange} 
                                        placeholder="Name" 
                                        className="border"
                                    />
                                    <input 
                                        type="text" 
                                        name="price" 
                                        value={editedItem.price || ''} 
                                        onChange={handleEditChange} 
                                        placeholder="Price" 
                                        className="border"
                                    />
                                    <button onClick={() => saveEdit(index)} className="bg-blue-500 text-white p-2 rounded">Save</button>
                                </>
                            ) : (
                                <>
                                    <h2 className='font-bold'>{el.name}</h2>
                                    <h2>{el.colors.join(', ')}</h2>
                                    <h2>{el.size.join(', ')}</h2>
                                    <h2 className='font-bold'>{el.price}</h2>
                                    <button onClick={() => startEditing(index)} className="bg-blue-500 text-white p-2 rounded mt-2">Edit</button>
                                </>
                            )}
                        </div>
                        <div className='flex flex-col justify-between items-end'>
                            <span className='text-3xl cursor-pointer text-[#FF3333]' onClick={() => deleteItem(index)}><FaRegTrashCan /></span>
                            <Counter />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        ) : (
            <>
            <h1>There are currently no products available...</h1> 
            <Link className="underline" href="/details">add product +</Link>
            </>
        )
        
        
       }
        </>
    );
}
