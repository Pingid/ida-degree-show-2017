import React from 'react';
import Slice from './Slice';
import { Motion, spring } from 'react-motion';
import { uniqueId } from 'lodash';

const Wheel = ({ people, selected, onSelect, radius }) => {
  const theta = (360 / people.length);
  const sliceRotation = (id) => {
    if (id < selected) return id * (270 / (people.length - 1)) - 38
    if (id === selected) return id * (270 / (people.length - 1))
    return (id * (270 / (people.length - 1))) + 38
  }
  const wheelRotation = () => {
  const newRotation = -selected * (270 / (people.length - 1));
    return newRotation
  }
  return (
    <Motion style={{ rotation: spring(wheelRotation()) }}>
      { ({ rotation }) => (
        <div style={{
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
        transform: `rotate(${rotation}deg)` }}>
        {
          people.map((x) => {
            const src = require(`../resources/profile-photos/small-cropped/${x.name}.jpg`);
            return (
              <Slice
                  key={uniqueId()}
                  imageSrc={src}
                  radius={radius}
                  rotation={sliceRotation(x._id)}
                  selected={x._id === selected}
                  onSelect={() => onSelect(x._id)}
                  theta={theta}
                  divisions={people.length}
              />
            )
          })
        }
        </div>
      )}
    </Motion>
  );
}

export default Wheel;
