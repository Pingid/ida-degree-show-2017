import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';

class Slice extends Component {
  constructor() {
    super();
    this.state = { hovering: false };
  }
  render() {
    const { imageSrc, rotation, radius, onSelect, selected, theta, divisions } = this.props;
    const { hovering } = this.state;
    const makePoly = () => {
      const oppositLength = Math.tan(Math.radians((360 / divisions) / 2)) * 50;
      return `polygon(${50 - oppositLength}% 0%, 50% 50%, ${50 + oppositLength}% 0%)`;
    }
    return (
      <Motion style={{
        rotate: spring(rotation),
        size: (hovering || selected) ? spring(49) : spring(50),
        grey: (selected) ? spring(0) : spring(100) }}>
        { ({ rotate, grey, size }) => (
          <div
            onClick={onSelect}
            onMouseEnter={() => this.setState({ hovering: true })}
            onMouseLeave={() => this.setState({ hovering: false })}
            style={{
              position: 'absolute',
              width: `${radius * 2}rem`,
              height: `${radius * 2}rem`,
              backgroundColor: 'white',
              backgroundImage: `url(${imageSrc})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 0%',
              backgroundSize: `auto ${size}%`,
              borderRadius: '100%',
              clipPath: makePoly(),
              transform: `rotate(${rotate}deg)`,
              filter: `grayscale(${grey}%)`,
              zIndex: hovering ? 10 : 1,
            }}>
          </div>
          )
        }
      </Motion>
    )
  }
}

export default Slice
