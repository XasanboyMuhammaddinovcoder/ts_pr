// components/Colors.js
'use client';

import { FC, useState } from 'react';

interface ColorItem {
  id: number;
  color: string;
  selected: boolean;
}

const initialColors: ColorItem[] = [
  { id: 1, color: 'red', selected: false },
  { id: 2, color: 'blue', selected: false },
  { id: 3, color: 'green', selected: false },
  { id: 4, color: 'yellow', selected: false },
  { id: 5, color: 'purple', selected: false },
  { id: 6, color: 'orange', selected: false },
  { id: 7, color: 'pink', selected: false },
  { id: 8, color: 'brown', selected: false },
  { id: 9, color: 'gray', selected: false },
  { id: 10, color: 'black', selected: false },
];

const Colors: FC = () => {
  const [colors, setColors] = useState<ColorItem[]>(initialColors);

  const handleColorClick = (id: number) => {
    const updatedColors = colors.map(color =>
      color.id === id ? { ...color, selected: !color.selected } : color
    );
    setColors(updatedColors);
  };

  return (
       <>
        <h2 className='font-bold text-2xl mt-6'>Colors</h2>
    <div className='flex flex-wrap gap-6 mt-2'>
      {colors.map(color => (
        <div
          key={color.id}
          onClick={() => handleColorClick(color.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            cursor: 'pointer',
            border: '1px solid #000',
            width: '24px',
            height: '24px',
            backgroundColor: color.color,
            justifyContent: 'center',
            position: 'relative',
            borderRadius: '50%'
          }}
        >
          {color.selected && <span style={{ color: 'white', fontSize: '18px', position: 'absolute' }}>✓</span>}
        </div>
      ))}
    </div>
    </>
  );
};

export default Colors;
