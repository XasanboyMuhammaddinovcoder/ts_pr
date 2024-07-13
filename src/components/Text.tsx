// components/TextCheckboxList.js
'use client';

import { FC, useState } from 'react';

interface TextItem {
  id: number;
  text: string;
  selected: boolean;
}

const initialTexts: TextItem[] = [
  { id: 1, text: 'XX-Small', selected: false },
  { id: 2, text: 'X-Small', selected: false },
  { id: 3, text: 'Small', selected: false },
  { id: 4, text: 'Medium', selected: false },
  { id: 5, text: 'Large', selected: false },
  { id: 6, text: 'X-Large', selected: false },
  { id: 7, text: 'XX-Large', selected: false },
  { id: 8, text: '3X-Large', selected: false },
  { id: 9, text: '4X-Large', selected: false },
];

const TextCheckboxList: FC = () => {
  const [texts, setTexts] = useState<TextItem[]>(initialTexts);

  const handleTextClick = (id: number) => {
    const updatedTexts = texts.map(text =>
      text.id === id ? { ...text, selected: !text.selected } : text
    );
    setTexts(updatedTexts);
  };

  return (
   <>
   <h2 className='text-2xl font-bold'>Size</h2>
    <div className='flex mt-4 gap-4 flex-wrap'>
      {texts.map(text => (
        <div
          key={text.id}
          onClick={() => handleTextClick(text.id)}
          style={{
            color: text.selected ? 'white' : 'black',
            padding: '10px',
            border: text.selected ? '2px solid black' : '2px solid #ccc',
            borderRadius: '5px',
            backgroundColor: text.selected ? '#000000' : 'transparent',
            cursor: 'pointer',
            width: '100px'
          }}
        >
          <div style={{ fontWeight: text.selected ? 'bold' : 'normal' }}>
            {text.text}
          </div>
          {/* {text.selected && <div style={{ color: 'green' }}>Selected</div>} */}
        </div>
      ))}
    </div>
    </>
  );
};

export default TextCheckboxList;
