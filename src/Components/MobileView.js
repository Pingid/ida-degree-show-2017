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
        We are the BA(Hons) Interaction Design Arts graduating class of 2017 from the London College of Communication. Through different approaches to design and art we generated a wide range of high-tech to low-tech and no-tech projects. Here you will find the projects exhibited in our 360 Degree Show, June 2017.
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
