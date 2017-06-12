import React from 'react';

const MobileProfileView = ({ people, selected, onSelect }) => {
  const currentPerson = people.filter(x => x._id === selected)[0];
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      minHeight: '100vh',
      background: 'white' }}>
      <h1 style={{ float: 'right' }} onClick={() => onSelect(null)}>X</h1>
      <h2 style={{ margin: 0, paddingBottom: '5px' }}>{currentPerson.profile.name}</h2>
      <h4 style={{ margin: 0, paddingBottom: '13px' }}>{currentPerson.profile.title}</h4>
      <h3 style={{ margin: 0, paddingBottom: '21px' }}><a href={currentPerson.profile.website}>{currentPerson.profile.website}</a></h3>
      {
        currentPerson.work.map((x, i) => {
          const imgSrc = require(`../resources/${x.src}`);
          return (
            <img
              key={i}
              src={imgSrc}
              style={{ width: '100%' }}
              alt="presentation"
            />
        )})
      }
    </div>
  );
}

export default MobileProfileView;
