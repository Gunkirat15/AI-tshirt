import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

import { getContrastingColor } from '../config/helpers';

const CustomButton = ({ type, title, customStyles = '', handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    switch (type) {
      case 'filled':
        return {
          backgroundColor: snap.color || '#000', 
          color: getContrastingColor(snap.color),
        };
      case 'outline':
        return {
          borderWidth: '1px', 
          borderColor: snap.color, 
          color: snap.color,
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
