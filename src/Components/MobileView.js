import React from 'react';
import MobileProfileView from './MobileProfileView';

const MobileView = ({ people, selected, onSelect }) => {
  return (
    <div>
      <div style={{ width: '100%' }}>
        <h1>IDA degree show 2017</h1>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        { people.map((x, i) => {
            const src = x.profile.image ? require(`../resources/${x.profile.image}`) : '';
            return (
              <div
                key={i}
                style={{
                  width: '33vw',
                  height: '49.5vw',
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  filter: `grayscale(${100}%)`,
                }}
                onClick={() => onSelect(x._id)}>
                {
                  selected !== null ? (
                    <MobileProfileView
                      people={people}
                      selected={selected}
                      onSelect={onSelect} />
                  ) : null
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default MobileView;
