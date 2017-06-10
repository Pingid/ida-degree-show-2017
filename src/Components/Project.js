import React from 'react';

const Project = ({ people, selected }) => {
  const currentPerson = people.filter(x => x._id === selected)[0];
  return (
    <div>
      <div style={{
        position: 'fixed',
        right: '4rem',
        width: '45%',
        top: '12vw',
        display: 'flex',
        flexFlow: 'column nowrap'
      }}>
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
    </div>
  )
}

export default Project;
