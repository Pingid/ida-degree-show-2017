import React, { Component } from 'react';
import MobileView from '../MobileView';
import LeftSide from '../LeftSide';
import Project from '../Project';

import data from '../../data';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      people: data.people.map((x, i) => Object.assign({}, x, { _id: i })),
    }
  }
  componentDidMount() {
    // document.addEventListener('mousewheel', this.handleScroll.bind(this));
    // document.addEventListener('DOMMouseScroll', this.handleScroll.bind(this));
  }
  componentWillUnmount() {
    // document.removeEventListener('mousewheel', this.handleScroll);
    // document.removeEventListener('DOMMouseScroll', this.handleScroll);
  }
  handleScroll(e) {
		const { people } = this.state;
    var e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta < 0 && e.wheelDelta < -10) {
      if (this.state.selected === 0) return this.setState({ selected: people.length - 1 })
      return this.setState({ selected: this.state.selected - 1})
    }
    if (delta > 0 && e.wheelDelta > 10) {
      if (this.state.selected === people.length - 1) return this.setState({ selected: 0 })
      return this.setState({ selected: this.state.selected + 1})
    }
  }
  handleSelect(id) {
    console.log(id);
    this.setState({ selected: id })
  }
  render() {
    const { selected, people } = this.state;
    console.log(selected);
    return (
      <div className="App">
        {
          window.innerWidth < 1000 ? (
            <MobileView
              people={people}
              selected={selected}
              onSelect={this.handleSelect.bind(this)} />
          ) : (
            <div>
              <LeftSide
                people={people}
                selected={selected}
                onSelect={this.handleSelect.bind(this)}
                radius={window.innerHeight / 3} />
              <Project
                people={people}
                selected={selected} />
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
