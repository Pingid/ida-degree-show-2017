import React from 'react';

const Person = ({ people, selected, onSelect }) => {
  const currentPerson = people.filter(x => x._id === selected)[0];
  return (
    <div>
      <div className="person-info">
        <h2 style={{ margin: 0, paddingBottom: '5px' }}>{currentPerson.profile.name}</h2>
        <h4 style={{ margin: 0 }}>{currentPerson.profile.title}</h4>
        <h5 style={{ margin: 0, marginTop: '5px' }} className="clickable"><a href={currentPerson.profile.website}>{currentPerson.profile.website}</a></h5>
      </div>
        <div className="person-work" style={{}}>
          {
            currentPerson.work.map((piece, i) => {
              const image = () => {
                // if (piece.src) return require(`../resources/${piece.src}`);
                // if (piece.drawing) return require(`../resources/drawings/${currentPerson.name}.jpg`);
                return require(`../resources/drawings/${currentPerson.name}.jpg`);
              }
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
              return [
                <div style={{ margin: '0 2rem', maxWidth: '17rem', minWidth: '10rem' }}>
                  <h4 className="orange" style={{ marginTop: 0 }}>{piece.name}</h4>
                  <h5 style={{  }}>{piece.description}</h5>
                  { collaborators() }
                </div>,
                <img style={{ height: '100%' }} src={image()} alt="presentation" />
              ];
            })
          }
        </div>
    </div>
  )
}

export default Person;
