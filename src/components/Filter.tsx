// components/Filter.js
'use client';

import { FC, useState } from 'react';

interface CheckboxItem {
  id: number;
  label: string;
  checked: boolean;
}

const initialItems: CheckboxItem[] = [
  { id: 1, label: 'T-shirts', checked: false },
  { id: 2, label: 'Shorts', checked: false },
  { id: 3, label: 'Shirts', checked: false },
  { id: 4, label: 'Hoodie', checked: false },
  { id: 5, label: 'Jeans', checked: false },
];

const Filter: FC = () => {
  const [items, setItems] = useState<CheckboxItem[]>(initialItems);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id: number) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleSelectAllChange = () => {
    const updatedItems = items.map(item => ({
      ...item,
      checked: !selectAll,
    }));
    setItems(updatedItems);
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <div className='flex w-full justify-between'>
          <label className='font-bold text-3xl mb-4'>Select All</label>
        <input
          type="checkbox"
          className='w-6'
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
      </div>
      {items.map(item => (
        <div key={item.id} className='flex w-full justify-between'>
            <label className='font-bold text-2xl'>{item.label}</label>
          <input
            className='w-6'
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheckboxChange(item.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Filter;
