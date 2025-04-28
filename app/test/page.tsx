"use client";
import { useRef, useState } from "react";
import Loading from "@/components/loading";
export default function ClickCounter() {
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0); // Để kiểm tra re-render

  const handleClick = () => {
    countRef.current += 1; // Cập nhật ref nhưng không làm re-render
    console.log("Số lần bấm:", countRef.current);
  };

  return (
    <div>
     <Loading isLoading={true}/>
    </div>
  );
}
