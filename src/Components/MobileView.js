import React from 'react';
import { uniqueId } from 'lodash';

import MobilePerson from './MobilePerson';

const MobileView = ({ people, selected, onSelect }) => {
  return (
    <div style={{  }}>
      <h4 style={{
        width: '61.8vw',
        color: 'black',
        margin: '0 auto',
        marginTop: '7rem',
        marginBottom: '4rem',
        maxWidth: '46rem',
        fontWeight: '600' }}>
        We are the 2017 graduating class of Interaction Design Arts at the London College of Communication. Here you can see our work exhibited at the 360 Degree Show and find links to our other work.
      </h4>
      <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        boxSizing: 'content-box',
        padding: '0 1 rem',
        marginBottom: '5rem',
      }}>
        {
          people.map((person, index) => {
            if (person._id === 0) return null;
            return (
              <div style={{ flex: '0 0 33.33%' }} onClick={() => onSelect(person._id)} key={uniqueId()}>
                <img alt="portrait" style={{ width: '100%' }} src={require(`../resources/profile-photos/small-cropped/${person.name}.jpg`)} />
              </div>
            )
          })
        }
      </div>
      <MobilePerson
        people={people}
        selected={selected}
        onSelect={onSelect} />
    </div>
  )
}

export default MobileView;
