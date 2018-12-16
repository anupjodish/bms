import React, {Component} from 'react';
import Results from './Components/Results'
import './App.css';

const existingArray = [
  7000,
  7001,
  7002,
  7003,
  7004,
  7005
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      results: [],
      duplicates: []
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.formPreventDefault = this.formPreventDefault.bind(this)
  }

  formPreventDefault(e) {
    e.preventDefault();
  }

  getAllValues = (valArray) => {
    let allValues = [];
    let range = [];
    valArray.map(val => {
      console.log('maps : ', val);
      if (!isNaN(val)) {
        allValues.push(parseInt(val, 10));
      } else {
        range = val.split('-');
        for (let i = range[0]; i <= range[1]; i++) {
          allValues.push(parseInt(i));
        }
      }
    });
    console.log("All Values : ", allValues);
    return allValues;
  }

  checkExisting = (val) => {
    val = val.split(',');
    let allValues = this.getAllValues(val);
    let duplicates = allValues.filter((v) => existingArray.includes(v));
    if (duplicates.length) {
      this.setState({
        duplicates: ['following numbers are duplicates' + duplicates.join(',')]
      });
    } else {
      this.setState({duplicates: []});
    }
    return duplicates;
  }

  checkRange(val) {
    if (val.indexOf('-') > -1) {
      val = val.split('-');
      if (parseInt(val[0], 10) > parseInt(val[1], 10)) {
        console.log('test');
        return true;
      }
    }
    return false;
  }
  handleInputChange(e) {
    // const re = /^[0-9\b]+$/;
    const re = /^(\d+(,\d+)*)(,\d+(-\d+)*)$/;
    let val = e.target.value;
    if (val === '' || !isNaN(val) || re.test(val)) {
      val = this.checkExisting(val);
      this.setState({value: val, results: []})
    } else if (this.checkRange(val)) {
      val = this.checkExisting(val);
      this.setState({value: val, results: []});
    } else {
      this.setState({results: ['Enter a Valid Range eg: 1,2,5-10'], duplicates:[]})
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.formPreventDefault}>
          <input className="search" placeholder="Enter Numbers" ref={input => this.search = input} onChange={this.handleInputChange}/>
          <Results results={this.state.results}/>
          <Results results={this.state.duplicates}/>
        </form>
      </div>
    );
  }
}

export default App;
