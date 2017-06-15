import React from 'react';
import { Motion, spring } from 'react-motion';
import { uniqueId } from 'lodash'

const MobilePerson = ({ people, selected, onSelect }) => {
  const person = people.find(x => x._id === selected);
  const open = selected !== 0;
  const iconStyle = {
    width: '100%',
    height: '3rem',
    background: '#EA601D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const previus = () => selected === 1 ? onSelect(people.length - 1) : onSelect(selected - 1);
  const next = () => selected === people.length - 1 ? onSelect(1) : onSelect(selected + 1);

  if (open) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }
  return (
    <Motion style={{ top: open ? spring(0) : spring(100) }}>
      {({ top }) => {
        return (
          <div style={{
              position: 'fixed',
              boxSizing: 'content-box',
              width: '100%',
              height: '100vh',
              overflowY: 'scroll',
              top: `${-top}vh`,
              background: 'white',
          }}>
            <div style={{
              width: '100%',
              position: 'fixed',
              top: `${-top}vh`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center' }}>
              <div style={iconStyle} onClick={previus}>
                <img alt="previus" style={{ height: '1rem' }} src={require('../resources/icons/back.png')} />
              </div>
              <div style={iconStyle} onClick={() => onSelect(0)}>
                <img alt="tiled view" style={{ height: '1rem' }} src={require('../resources/icons/cancel.png')} />
              </div>
              <div style={iconStyle} onClick={next}>
                <img alt="next" style={{ height: '1rem' }} src={require('../resources/icons/next.png')} />
              </div>
            </div>
            <div style={{
              position: 'fixed',
              width: '100%',
              height: '80vh',
              top: `${-top}vh`,
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
                  const image = () => {
                    if (piece.photos) return require(`../resources/work/small/${piece.photos[0]}.jpg`);
                    return require(`../resources/drawings/${person.name}-${i + 1}.jpg`);
                  }
                  const collaborators = () => {
                    if (piece.collaborators) {
                      const collaborators = piece.collaborators.map(x => people.find(y => y.name === x));
                      return (
                        <h5 style={{ display: 'flex' }} >
                          In collaboation with: {
                            collaborators.map(x => (
                              <h5 key={uniqueId()} style={{ margin: 0, paddingLeft: '5px'}} className="clickable" onClick={() => onSelect(x._id)}>{x.profile.name}</h5>
                            ))
                          }
                        </h5>
                      )
                    }
                    return null
                  }
                  return (
                    <div key={uniqueId()} style={{ margin: '0 1rem', marginBottom: '5rem' }}>
                      <h4 className="orange" style={{ margin: '0' }}>{piece.name}</h4>
                      <img alt="sketch" style={{ width: '100%' }} src={image()} />
                      <h5 style={{ marginTop: '5px' }}>{piece.description}</h5>
                      { collaborators() }
                    </div>
                  );
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
