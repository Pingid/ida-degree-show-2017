import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';

class Slice extends Component {
  constructor() {
    super();
    this.state = { hovering: false };
  }
  render() {
    const { imageSrc, rotation, radius, onSelect, selected, divisions } = this.props;
    const { hovering } = this.state;
		const oppositLength = Math.tan(Math.radians((250 / divisions) / 2)) * 50;
    const makePoly = () => {
			if (selected) return `polygon(${10}% 0%, 50% 50%, ${90}% 0%)`;
      return `polygon(${50 - oppositLength}% 0%, 50% 50%, ${50 + oppositLength}% 0%)`;
    }
    const opacity = () => {
      if (selected) return spring(100);
      if (hovering) return spring(80);
      return spring(50);
    }
    return (
      <Motion style={{
				rotate: spring(rotation),
        opacity: opacity(),
				polyLeft: (selected) ? spring(5) : spring(50 - oppositLength),
				polyRight: (selected) ? spring(95) : spring(50 + oppositLength),
        grey: (selected) ? spring(0) : spring(100) }}>
        { ({ opacity, grey, polyLeft, rotate, polyRight }) => (
          <div
            onClick={onSelect}
            onMouseEnter={() => this.setState({ hovering: true })}
            onMouseLeave={() => this.setState({ hovering: false })}
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
              zIndex: hovering ? 10 : 1
            }}>
          </div>
          )
        }
      </Motion>
    )
  }
}

export default Slice
