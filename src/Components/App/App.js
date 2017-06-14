import React, { Component } from 'react';
import { layoutGenerator } from 'react-break';

import Header from '../Header';
import Wheel from '../Wheel';
import Person from '../Person';
import MobileView from '../MobileView';

import data from '../../data';

const layout = layoutGenerator({
 mobile: 0,
 desktop: 600,
});

const OnMobile = layout.is('mobile');
const OnDesktop = layout.is('desktop');

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: 23,
      people: data.people.map((x, i) => Object.assign({}, x, { _id: i })),
    }
  }
  componentDidMount() {
    if (window.innerWidth > 600) {
      document.addEventListener('mousewheel', this.handleScroll.bind(this));
      document.addEventListener('DOMMouseScroll', this.handleScroll.bind(this));
    }
  }
  componentWillUnmount() {
    document.removeEventListener('mousewheel', this.handleScroll);
    document.removeEventListener('DOMMouseScroll', this.handleScroll);
  }
  handleScroll(event) {
		const { people } = this.state;
    let e = window.event || event;
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
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
    this.setState({ selected: id })
  }
  render() {
    const { selected, people } = this.state;
    const wheelRadius = () => {
      if (window.innerWidth > window.innerHeight) return (window.innerHeight / 2) - 40;
      return (window.innerWidth / 2) - 40;
    }
    return (
      <div className="App">
        <OnMobile>
          <Header />
          <MobileView
            people={people}
            selected={selected}
            onSelect={this.handleSelect.bind(this)} />
        </OnMobile>
        <OnDesktop>
          <div style={{
            top: 0,
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Wheel
              people={people}
              selected={selected}
              onSelect={this.handleSelect.bind(this)}
              radius={wheelRadius()}
            />
          </div>
          <div style={{
            width: '100%',
            height: '50vh',
            background: 'white',
            position: 'fixed',
            bottom: '0',
            opacity: '.95'}}>
          </div>
          <div style={{
            position: 'fixed',
            width: '100%',
            height: '50vh',
            bottom: '0',
            paddingTop: '2rem',
            boxSizing: 'border-box'
          }}>
            {
              selected !== 0 ? (
                <Person
                  people={people}
                  selected={selected}
                  onSelect={this.handleSelect.bind(this)} />
              ) : (
                <h3 style={{ width: '61.8vw', color: 'black', margin: '0 auto', maxWidth: '46rem', fontWeight: '600' }}>
                  We are Interaction Design Arts at the London Collage of Communication graduating 2017. Here you can see are work exhibited at our 360 degree show and find links to our other work.
                </h3>
              )
            }
          </div>
        </OnDesktop>
      </div>
    );
  }
}

export default App;
