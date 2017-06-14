import React from 'react';
import { Motion, spring } from 'react-motion';

const MobilePerson = ({ people, selected, onSelect }) => {
  const person = people.find(x => x._id === selected);
  const open = selected !== 0;
  return (
    <Motion style={{ top: open ? spring(0) : spring(100) }}>
      {({ top }) => {
        return (
          <div style={{
              position: 'fixed',
              width: '100%',
              height: '100vh',
              overflowY: 'scroll',
              top: `${-top}vh`,
              background: 'white',
          }}>
            <div style={{
              position: 'fixed',
              width: '100%',
              height: '100vh',
              top: `${-top}vh`,
              backgroundImage: `url(${require(`../resources/profile-photos/small-cropped/${person.name}.jpg`)})`,
              backgroundSize: 'cover',
              filter: 'grayscale(100%)',
              opacity: .5,
              zIndex: -1,
            }}></div>
            <div style={{ boxSizing: 'border-box', padding: '1rem' }}>
              <h2 style={{ margin: 0, paddingBottom: '5px' }}>{person.profile.name}</h2>
              <h4 style={{ margin: 0 }}>{person.profile.title}</h4>
              <h5 style={{ margin: 0, marginTop: '5px' }} className="clickable"><a href={person.profile.website}>{person.profile.website}</a></h5>
            </div>
            <div>
              {
                person.work.map((piece, i) => {
                  console.log(i);
                  const image = require(`../resources/drawings-transparent/${person.name}-${i + 1}.png`);
                  const collaborators = () => {
                    if (piece.collaborators) {
                      const collaborators = piece.collaborators.map(x => people.find(y => y.name === x));
                      return (
                        <h5 style={{ display: 'flex' }}>
                          In collaboation with: {
                            collaborators.map(x => (
                              <h5 style={{ margin: 0, paddingLeft: '5px'}} className="clickable" onClick={() => onSelect(x._id)}>{x.profile.name}</h5>
                            ))
                          }
                        </h5>
                      )
                    }
                    return null
                  }
                  return (
                    <div key={i} style={{ margin: '0 1rem', marginTop: '40vh' }}>
                      <h4 className="orange" style={{ marginTop: 0 }}>{piece.name}</h4>
                      <img style={{ width: '92vw' }} src={require(`../resources/drawings/${person.name}-${i + 1}.jpg`)} />
                      <h5 style={{  }}>{piece.description}</h5>
                      { collaborators() }
                    </div>
                  );
                  // return [
                  //   <div style={{
                  //     backgroundImage: `url(${image})`,
                  //     backgroundSize: 'contain',
                  //     backgroundRepeat: 'no-repeat',
                  //     backgroundPosition: 'right',
                  //     width: '100%',
                  //     maxWidth: '40rem',
                  //     minWidth: '20rem' }}></div>,
                  //   <div style={{ margin: '0 2rem', maxWidth: '17rem', minWidth: '10rem' }}>
                  //     <h4 className="orange" style={{ marginTop: 0 }}>{piece.name}</h4>
                  //     <h5 style={{  }}>{piece.description}</h5>
                  //     { collaborators() }
                  //   </div>
                  // ];
                })
              }
            </div>
          </div>
        )
      }}
    </Motion>
  );
}

export default MobilePerson;
