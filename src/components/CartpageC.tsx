import { FaRegTrashCan } from "react-icons/fa6";
import Counter from "./counter";
import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../../firebase/config";
import { collection, doc, getDocs, deleteDoc, updateDoc, DocumentData } from "firebase/firestore";

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

export default function CartpageC() {
    const [cartItems, setCartItems] = useState<ClothesItem[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<Partial<ClothesItem>>({});

    useEffect(() => {
        const fetchCartItems = async () => {
            const querySnapshot = await getDocs(collection(db, "cart"));
            const items: ClothesItem[] = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() } as ClothesItem);
            });
            setCartItems(items);
        };

        fetchCartItems();
    }, []);

    const deleteItem = async (index: number) => {
        const itemToDelete = cartItems[index];
        await deleteDoc(doc(db, "cart", itemToDelete.id));
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditedItem(cartItems[index]);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem((prevState) => ({ ...prevState, [name]: value }));
    };

    const saveEdit = async (index: number) => {
        const itemToEdit = cartItems[index];
        const updatedItem = { ...itemToEdit, ...editedItem };
        await updateDoc(doc(db, "cart", itemToEdit.id), updatedItem);
        const updatedCartItems = [...cartItems];
        updatedCartItems[index] = updatedItem;
        setCartItems(updatedCartItems);
        setEditingIndex(null);
        setEditedItem({});
    };

    return (
        <>
            {cartItems.length > 0 ? (
                <div className='flex flex-col border rounded-[20px] p-12 gap-8 mb-12'>
                    {cartItems.map((el, index) => (
                        <div key={index} className='flex gap-6'>
                            <div>
                                <img className='w-60' src={el.images || ''} alt={el.name} />
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
                                            <h2>color: <span className="border" style={{background: el.colors}}>{el.colors}</span></h2>
                                            <h2>{el.size}</h2>
                                            <h2 className='font-bold'>${el.price}</h2>
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
                    <Link className="underline" href="/details">Add product +</Link>
                </>
            )}
        </>
    );
}
