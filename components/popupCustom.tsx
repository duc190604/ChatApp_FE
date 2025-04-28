import { useState } from "react";
type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};
export const Popup = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      {children}
    </div>
  );
};

