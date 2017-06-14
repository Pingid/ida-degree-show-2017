import React, { Component } from 'react';
import { layoutGenerator } from 'react-break';

import Header from '../Header';
import Wheel from '../Wheel';
import Person from '../Person';

import data from '../../data';

const layout = layoutGenerator({
 mobile: 0,
 phablet: 550,
 tablet: 768,
 desktop: 992,
});

const OnMobile = layout.is('mobile');
const OnAtLeastTablet = layout.isAtLeast('tablet');
const OnAtMostPhablet = layout.isAtMost('phablet');
const OnDesktop = layout.is('desktop');

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: 14,
      people: data.people.map((x, i) => Object.assign({}, x, { _id: i })),
    }
  }
  componentDidMount() {
    document.addEventListener('mousewheel', this.handleScroll.bind(this));
    document.addEventListener('DOMMouseScroll', this.handleScroll.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('mousewheel', this.handleScroll);
    document.removeEventListener('DOMMouseScroll', this.handleScroll);
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
    const wheelRadius = window.innerHeight / 3;
    return (
      <div className="App">
        <Header />
        {
          selected !== 0 ? (
            <Person
              people={people}
              selected={selected}
              onSelect={this.handleSelect.bind(this)} />
          ) : (
            <div style={{
              height: '83.5vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h3 style={{ width: '61.8vw', color: 'black' }}>
                We are Interaction Design Arts at the London Collage of Communication graduating 2017. Here you can see are work exhibited at our 360 degree show and find links to our other work.
              </h3>
            </div>
          )
        }
        <div style={{ position: 'fixed', bottom: -wheelRadius, left: '50%', marginLeft: -wheelRadius  }}>
          <Wheel
            people={people}
            selected={selected}
            onSelect={this.handleSelect.bind(this)}
            radius={wheelRadius}
          />
        </div>
      </div>
    );
  }
}

export default App;
