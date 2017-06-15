import React from 'react';

const Project = ({ person, name, description, photos, collaboratorElems, i }) => {
  const image = () => {
    if (photos) return require(`../resources/work/small/${photos[0]}.jpg`);
    return require(`../resources/drawings/${person.name}-${i + 1}.jpg`);
  }
  const collabs = collaboratorElems();
  if ((window.innerWidth < 1000 && person.work.length > 1) || window.innerWidth < 600) {
    return (
      <div style={{ display: 'flex', flexFlow: 'column', margin: '0 1rem', marginBottom: '2rem' }}>
        <h4 className="orange" style={{ marginTop: 0 }}>{name}</h4>
        <div style={{ maxHeight: '25vh', maxWidth: '50vw' }}>
          <img style={{ maxWidth: '100%', maxHeight: '24vh' }} src={image()} alt="piece" />
        </div>
        <div style={{ maxWidth: 'calc(3 * 25vh / 2)' }}>
          <h5 style={{  }}>{description}</h5>
          { collabs ? <h5 style={{ display: 'flex', margin: 0 }}>In collaboation with: { collabs }</h5> : null }
        </div>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: '40vh', maxWidth: '50vw' }}>
        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={image()} alt="piece" />
      </div>
      <div style={{ width: '15rem', boxSizing: 'border-box', padding: '0 2rem', paddingLeft: '1rem' }}>
        <h4 className="orange" style={{ marginTop: 0 }}>{name}</h4>
        <h5 style={{  }}>{description}</h5>
        { collabs ? <h5 style={{ display: 'flex' }}>In collaboation with: { collabs }</h5> : null }
      </div>
    </div>
  )
}

export default Project;
