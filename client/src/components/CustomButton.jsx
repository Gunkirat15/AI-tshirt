import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const CustomButton = ({ type, title, customStyles = '', handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    switch (type) {
      case 'filled':
        return {
          backgroundColor: snap.color || '#000', 
          color: '#fff',
        };
      case 'outline':
        return {
          border: `2px solid ${snap.color || '#000'}`, 
          color: snap.color || '#000',
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={{ ...generateStyle(type), cursor: 'pointer' }}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
