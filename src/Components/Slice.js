import React from 'react';
import { Motion, spring } from 'react-motion';

const Slice = ({ imageSrc, rotation, radius, onSelect, selected, divisions }) => {
	const oppositLength = Math.tan(Math.radians((250 / divisions) / 2)) * 50;
  return (
    <Motion style={{
      rotate: spring(rotation),
      polyLeft: selected ? spring(5) : spring(50 - oppositLength),
      polyRight: selected ? spring(95) : spring(50 + oppositLength),
      grey: selected ? spring(0) : spring(100),
    }}>
      {({ rotate, polyLeft, polyRight, grey }) => (
        <div
          className={`slicce ${selected ? 'slicce-open' : ''}`}
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
            transform: `rotate(${rotate}deg)`,
            filter: `grayscale(${grey}%)`,
          }}>
        </div>
      )}
    </Motion>
  )
}

export default Slice
