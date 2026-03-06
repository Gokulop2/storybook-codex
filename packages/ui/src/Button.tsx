import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} style={{ padding: '8px 16px', fontSize: '16px' }}>
    {children}
  </button>
);
