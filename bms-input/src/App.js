import React, {Component} from 'react';
import Results from './Components/Results'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      existing: [
        7000,
        7001,
        7002,
        7003,
        7004,
        7005
      ],
      errors: '',
      duplicates: [],
      uniques: []
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.formPreventDefault = this.formPreventDefault.bind(this)
  }
  componentDidMount = () => {
    this.inputRef.focus();
  };
  formPreventDefault(e) {
    e.preventDefault();
  }

  getAllValues = (valArray) => {
    let allValues = [];
    let range = [];
    valArray.map(val => {
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
    let existingArray = this.state.existing;
    let allValues = this.getAllValues(val);
    let duplicates = allValues.filter((v) => existingArray.includes(v));
    let uniques = allValues.filter((v) => !existingArray.includes(v));
    if (duplicates.length) {
      this.setState({duplicates: duplicates, uniques: uniques});
    } else if (uniques.length) {
      this.setState({duplicates: duplicates, uniques: uniques});
      this.postData(duplicates,uniques);
    } else {
      this.setState({duplicates: [], uniques: []});
    }
    return duplicates;
  }

  postData = (duplicates,uniques) => {
    fetch('http://localhost:4000/setdata', {
      method: 'post',
      body: JSON.stringify({"data":{"duplicates": duplicates, "uniques": uniques}})
    }).then(res => {
      alert('added to redis');
    });
  }
  checkRange(val) {
    if (val.indexOf('-') > -1) {
      val = val.split('-');
      if (parseInt(val[0], 10) < parseInt(val[1], 10)) {
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
      this.setState({value: val, errors: ''})
    } else if (this.checkRange(val)) {
      val = this.checkExisting(val);
      this.setState({value: val, errors: ''});
    } else {
      this.setState({errors: 'Enter a Valid Range eg: 1,2,5-10', duplicates: []})
    }
  }

  render() {
    return (
      <div className="App">
        <Results title="Existing Numbers" results={this.state.existing}/>
        <Results title="Unique Numbers" results={this.state.uniques}/>
        <Results title="Duplicate Numbers" results={this.state.duplicates}/>
        <form onSubmit={this.formPreventDefault}>
          <input className="search" placeholder="Enter Numbers" ref={ref => (this.inputRef = ref)} onChange={this.handleInputChange}/>
          <div className="error-message">{this.state.errors}</div>
        </form>
      </div>
    );
  }
}

export default App;
