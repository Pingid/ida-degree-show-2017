import React, { Component } from 'react';
import { layoutGenerator } from 'react-break';

import Header from '../Header';
import Wheel from '../Wheel';
import Person from '../Person';
import MobileView from '../MobileView';

import data from '../../data';

const layout = layoutGenerator({
 mobile: 0,
 desktop: 740,
});

const OnMobile = layout.is('mobile');
const OnDesktop = layout.is('desktop');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: data.people.map((x, i) => Object.assign({}, x, { _id: i })),
      scroll: 0,
    }
    this.getSelected = this.getSelected.bind(this);
    this.selectPerson = this.selectPerson.bind(this);
    this.checkNameInURL = this.checkNameInURL.bind(this);
    this.checkNameInURL(props);
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
  shouldComponentUpdate(props) { return this.checkNameInURL(props); }
  checkNameInURL({ history, match }) {
    const { people } = this.state;
    if (match.params.name) {
      const isRealName = people.find(x => (x.profile && x.profile.name.toLowerCase().split(' ').join('-') === match.params.name));
      if (!isRealName) {
        history.replace('/');
        return false;
      }
    }
    return true;
  }
  getSelected() {
    const { match } = this.props;
    const { people } = this.state;
    if (!match.params.name) return people[0];
    return people.find(x => (x.profile && x.profile.name.toLowerCase().split(' ').join('-') === match.params.name));
  }
  selectPerson(id) {
    const { people } =  this.state;
    const { match, history } = this.props;
    const person = people.find(x => x._id === id);
    const normalisedName = person.profile.name.toLowerCase().split(' ').join('-');
    if (normalisedName !== match.params.name) return history.push(normalisedName);
  }
  handleScroll(event) {
		const { people, scroll } = this.state;
    const e = window.event || event;
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    const person = this.getSelected();
    const selected = person._id;

    if (scroll <= -9) {
      if (selected <= 0) {
        this.selectPerson(people.length - 1);
        return this.setState({ scroll: 0 });
      }
      this.selectPerson(selected - 1);
      return this.setState({ scroll: 0 });
    }
    if (scroll >= 9) {
      if (selected >= people.length - 1) {
        this.selectPerson(0);
        return this.setState({ scroll: 0 });
      }
      this.selectPerson(selected + 1);
      return this.setState({ scroll: 0 });
    }

    if (delta < 0 && e.wheelDelta < -1) { return this.setState({ scroll: scroll - 1}) }
    if (delta > 0 && e.wheelDelta > 1) { return this.setState({ scroll: scroll + 1}) }
  }
  render() {
    const { people } = this.state;
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
            selected={this.getSelected()._id}
            onSelect={this.selectPerson.bind(this)} />
        </OnMobile>
        <OnDesktop>
          <div style={{ top: 0, position: 'fixed', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Wheel people={people} selected={this.getSelected()._id} onSelect={this.selectPerson.bind(this)} radius={wheelRadius()} />
          </div>
          <div style={{ width: '100%', height: '50vh', background: 'white', position: 'fixed', bottom: '0', opacity: '.95' }}></div>
          <div style={{ position: 'fixed', width: '100%', height: '50vh', bottom: '0', paddingTop: '2rem', boxSizing: 'border-box' }}>
            {
              this.getSelected()._id !== 0 ? (
                <Person
                  people={people}
                  selected={this.getSelected()._id}
                  onSelect={this.selectPerson.bind(this)} />
              ) : (
                <h3 style={{ width: '61.8vw', color: 'black', margin: '0 auto', maxWidth: '46rem', fontWeight: '100' }}>
                  We are the 2017 graduating class of Interaction Design Arts at the London College of Communication. Here you can see our work exhibited at the 360 Degree Show and find links to our other work.
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
