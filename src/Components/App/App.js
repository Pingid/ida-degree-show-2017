import React, { Component } from 'react';
import Wheel from '../Wheel';

import data from '../../data';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
      people: data.people.map((x, i) => Object.assign({}, x, { _id: i })),
    }
  }
  handleSelect(name) {
    this.setState({ selected: name })
  }
  render() {
    const { selected, people } = this.state;
    return (
      <div className="App" style={{ display: 'flex' }}>
        <Wheel
          people={people}
          selected={selected}
          onSelect={this.handleSelect.bind(this)}
          radius={20}
        />
      </div>
    );
  }
}

export default App;
