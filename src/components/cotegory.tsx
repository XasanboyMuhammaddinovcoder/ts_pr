import React from 'react';

interface TextCheckboxListProps {
  category: string;
}

const CotegoryCheck: React.FC<TextCheckboxListProps> = ({ category }) => {
  return (
    <div>   
       <h1>{category}</h1>
    </div>
  );
};

export default CotegoryCheck;
