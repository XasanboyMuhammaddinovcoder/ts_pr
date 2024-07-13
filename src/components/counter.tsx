"use client";
import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  const increment = (): void => {
    setCount(count + 1);
  };

  const decrement = (): void => {
    setCount(count - 1);
  };

  return (
    <div>
      <div className="flex items-center gap-8 rounded-[62px] px-8 py-1 bg-[#F0F0F0]">
        <span className="cursor-pointer text-[40px]" onClick={decrement}> - </span>
        <p className="text-[25px]">{count}</p>
        <span className="cursor-pointer text-[40px]" onClick={increment}> + </span>
      </div>
    </div>
  );
};

export default Counter;