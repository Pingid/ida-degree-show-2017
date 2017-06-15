import React from 'react';
import { uniqueId } from 'lodash'

import Project from './Project';

const MobilePerson = ({ people, selected, onSelect }) => {
  const person = people.find(x => x._id === selected);
  const open = selected !== 0;

  if (open) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }
  const topClass = `mobile-person ${selected ? 'mobile-person-open' : ''}`;
  return (
    <div className={topClass} style={{
        position: 'fixed',
        boxSizing: 'content-box',
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        background: 'white',
    }}>
      <div className={topClass} style={{
        width: '100%',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'flex-end' }}>
        <div style={{padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => onSelect(0)}>
          <img alt="tiled view" style={{ height: '1.5rem' }} src={require('../resources/icons/times.svg')} />
        </div>
      </div>
      <div className={topClass} style={{
        position: 'fixed',
        width: '100%',
        height: '80vh',
        marginTop: '-1rem',
        backgroundImage: `url(${require(`../resources/profile-photos/small-cropped/${person.name}.jpg`)})`,
        backgroundSize: 'cover',
        filter: 'grayscale(100%)',
        opacity: .5,
        zIndex: -1,
      }}></div>
      <div style={{ boxSizing: 'border-box', padding: '1rem', marginTop: '40vh', }}>
        <h2 style={{ margin: 0, paddingBottom: '5px' }}>{person.profile.name}</h2>
        <h4 style={{ margin: 0 }}>{person.profile.title}</h4>
        <h5 style={{ margin: 0, marginTop: '5px' }} className="clickable"><a href={person.profile.website}>{person.profile.website}</a></h5>
      </div>
      <div style={{ background: 'white', padding: '2rem', boxSizing: 'content-box' }}>
        {
          person.work.map((piece, i) => {
            const collaboratorElems = () => {
              if (piece.collaborators) {
                const collaborators = piece.collaborators.map(x => people.find(y => y.name === x));
                return collaborators.map(x => (
                  <span
                    key={uniqueId()}
                    className="clickable"
                    style={{ margin: 0, paddingLeft: '5px'}}
                    onClick={() => onSelect(x._id)}>{x.profile.name}</span>
                ))
              }
              return null
            }
            return <Project
                      key={uniqueId()}
                      person={person}
                      collaboratorElems={collaboratorElems}
                      i={i}
                      {...piece} />;
          })
        }
      </div>
    </div>
  )
}

export default MobilePerson;
