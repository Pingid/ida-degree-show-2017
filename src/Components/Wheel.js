import React, { Component } from 'react';
import Slice from './Slice';
import { Motion, spring } from 'react-motion';

class Wheel extends Component {
  constructor() {
    super();
    this.state = { lastSelection: 0 };
  }
  componentWillReceiveProps({ selected }) {
    this.setState({ lastSelection: this.props.selected });
  }
  render() {
    const { people, selected, onSelect, radius } = this.props;
    const { lastSelection } = this.state;
    const theta = (360 / people.length);
    const sliceRotation = (id) => {
  		if (id < selected) return id * (270 / (people.length - 1)) - 38
  		if (id === selected) return id * (270 / (people.length - 1))
      return (id * (270 / (people.length - 1))) + 38
    }
  	const wheelRotation = () => {
      const lastRotation = -lastSelection * (270 / (people.length - 1));
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
  								 key={x._id}
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
    )
  }
}

export default Wheel;
