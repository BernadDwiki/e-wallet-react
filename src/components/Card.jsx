import React from 'react';

const Card = ({
  children,
  className = '',
  bgColor = 'bg-white',
  borderRadius = 'rounded-[14px]',
  padding = 'p-5'
}) => {
  return (
    <div className={`${bgColor} ${borderRadius} border border-gray-200 ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default Card;