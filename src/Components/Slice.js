import React from 'react';

const Slice = ({ imageSrc, rotation, radius, onSelect, selected, divisions }) => {
	const oppositLength = Math.tan(Math.radians((250 / divisions) / 2)) * 50;

  const polyLeft = selected ? 5 : 50 - oppositLength;
  const polyRight = selected ? 95 : 50 + oppositLength
  const grey = selected ? 0 : 100;
  return (
    <div
      className={`slice ${selected ? 'slice-open' : 'slice-closed'}`}
      onClick={onSelect}
      style={{
        position: 'absolute',
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        backgroundColor: 'white',
        backgroundImage: `url(${imageSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 0%',
        backgroundSize: `auto 50%`,
        borderRadius: '100%',
        clipPath: `polygon(${polyLeft}% 0%, 50% 50%, ${polyRight}% 0%)`,
        WebkitClipPath: `polygon(${polyLeft}% 0%, 50% 50%, ${polyRight}% 0%)`,
        transform: `rotate(${rotation}deg)`,
        filter: `grayscale(${grey}%)`,
      }}>
    </div>
  )
}

export default Slice
