import React from 'react';

const Project = ({ people, selected }) => {
  const currentPerson = people.filter(x => x._id === selected)[0];
  const projectImage = currentPerson.work[0] ? require(`../resources/${currentPerson.work[0].src}`) : ''
  return (
    <div>
      <div style={{
        height: '25vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        marginLeft: '4rem',
      }}>
        <h2 style={{ margin: 0, paddingBottom: '5px' }}>{currentPerson.profile.name}</h2>
        <h4 style={{ margin: 0, paddingBottom: '13px' }}>{currentPerson.profile.title}</h4>
      </div>
      <div style={{
        height: '33vh',
        display: 'flex',
        justifyContent: 'center' }}>
        <img style={{ height: '100%' }} src={projectImage} alt="presentation" />
        <h4 style={{
          marginTop: '0rem',
          marginLeft: '1.7rem',
          transform: 'rotate(90deg)',
          transformOrigin: 'left top',
          width: 0 }}>
          <a href={currentPerson.profile.website}>{currentPerson.profile.website}</a>
        </h4>
      </div>
    </div>
  )
}

export default Project;
