import React from 'react';
import Slice from './Slice';

const Wheel = ({ people, selected, onSelect, radius }) => {
  const theta = (360 / people.length)
  const centerSelected = (id) => {
    const num = id + (people.length - selected);
    // console.log('num', num, 'id', id, 'selected', selected);
    if (num === people.length || num === 0) return  num * (360 / people.length);
    return num * (360 / people.length);
  }
  return (
    <div style={{ background: 'blue', marginLeft: '20rem' }}>
    {
      people.map((x) => {
        const src = x.profile.image ? require(`../resources${x.profile.image}`) : ''
        const rotateSlice = () => {
        }
        return (
          <Slice
            key={x._id}
            imageSrc={src}
            radius={radius}
            rotation={centerSelected(x._id)}
            selected={x._id === selected}
            onSelect={() => onSelect(x._id)}
            theta={theta}
            divisions={people.length}
          />
        )

      })
    }
    </div>
  )
}

export default Wheel;
