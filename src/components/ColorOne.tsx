import React, { FC } from 'react';

interface ColorsProps {
  color: string; // Malumot turini to'g'ri ko'rsating
}

const ColorONE: FC<ColorsProps> = ({ color }) => {
  return (
    <div>
      {/* Rangni dumaloq shaklda ko'rsatish */}
      <div style={{ backgroundColor: color, width: '35px', height: '35px', border: '1px solid black', borderRadius: '50%' }}></div>
    </div>
  );
};

export default ColorONE;
