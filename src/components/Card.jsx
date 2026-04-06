import React from 'react';

/**
 * Komponen Card reusable untuk membungkus konten dengan gaya kartu.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Konten yang ditampilkan di dalam kartu.
 * @param {string} [props.className=''] - Kelas tambahan untuk styling custom.
 * @param {string} [props.bgColor='bg-white'] - Warna latar belakang kartu.
 * @param {string} [props.borderRadius='rounded-[14px]'] - Radius border untuk kartu.
 * @param {string} [props.padding='p-5'] - Padding internal kartu.
 * @returns {JSX.Element} Komponen Card.
 */
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